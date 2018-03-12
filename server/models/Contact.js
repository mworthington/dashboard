// server/models/Rsvp.js
/*
 |--------------------------------------
 | Rsvp Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
  userId: { type: String, required: true },
  title: String,
  firstName: String,
  lastName: { type: String, required: true },
  organisation: { type: String, required: true },
  twitterHandle: String,
  rationale: { type: String, required: true },
  changesInPosition: String,
  geography: { type: String, required: true },
  category: { type: String, required: true },
  contactType: { type: String, required: true },
  subjectOfInterest: String,
  attitude: String,
  influence: { type: Number, required: true },
  comments: String
});

module.exports = mongoose.model('Contact', rsvpSchema);