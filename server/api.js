// server/api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Contact = require('./models/Contact');
const Event = require('./models/Event');

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function (app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  /*
   |--------------------------------------
   | API Routes
   |--------------------------------------
   */

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({
        message: 'Not authorized for admin access'
      });
    }
  }

  const _eventListProjection = 'title startDatetime endDatetime viewPublic';

  // GET list of public events starting in the future
  app.get('/api/events', (req, res) => {
    Event.find({
      viewPublic: true,
      startDatetime: {
        $gte: new Date()
      }
    }, _eventListProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });

    // GET RSVPs by event ID
    app.get('/api/event/:eventId/rsvps', jwtCheck, (req, res) => {
      Rsvp.find({eventId: req.params.eventId}, (err, rsvps) => {
        let rsvpsArr = [];
        if (err) {
          return res.status(500).send({message: err.message});
        }
        if (rsvps) {
          rsvps.forEach(rsvp => {
            rsvpsArr.push(rsvp);
          });
        }
        res.send(rsvpsArr);
      });
    });

  // GET list of all events, public and private (admin only)
  app.get('/api/events/admin', jwtCheck, adminCheck, (req, res) => {
    Event.find({}, _eventListProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });

  // GET event by event ID
  app.get('/api/event/:id', jwtCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!event) {
        return res.status(400).send({
          message: 'Event not found.'
        });
      }
      res.send(event);
    });
  });

  // GET list of all contacts
  app.get('/api/contacts/admin', jwtCheck, adminCheck, (req, res) => {
    Contact.find({}, _eventListProjection, (err, contacts) => {
      let contactsArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (contacts) {
        contacts.forEach(contact => {
          contactsArr.push(contact);
        });
      }
      res.send(contactsArr);
    });
  });

  // GET contact by contact ID
  app.get('/api/contact/:id', jwtCheck, (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!contact) {
        return res.status(400).send({
          message: 'Event not found.'
        });
      }
      res.send(contact);
    });
  });

};
