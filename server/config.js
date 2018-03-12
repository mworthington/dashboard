// server/config.js
module.exports = {
    NAMESPACE: 'https://padashboard.com/roles', //location of roles from Auth0 inside rules
    AUTH0_DOMAIN: 'padashboard.eu.auth0.com', // e.g., kmaida.auth0.com
    AUTH0_API_AUDIENCE: 'http://localhost:8083/api/', // e.g., 'http://localhost:8083/api/'
    MONGO_URI: process.env.MONGO_URI || 'mongodb://padashboardadmin:qr8sNdsYavA7ubkf@ds149138.mlab.com:49138/padashboard'
  };