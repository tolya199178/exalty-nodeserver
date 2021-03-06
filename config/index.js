'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,
  // Root path of server
  root: path.normalize(__dirname + '/..'),

  // Server port
  port: process.env.PORT || 9001,
  
  //Stripe Key
  //stripeKey: 'sk_test_4dEBc9A6SWTvwn988UMZM3Bd',
  //stripePlanId: '1',

  stripeKey: 'sk_live_WG0AxMzXCyiyoPkZXZgkDDz7',
  stripePlanId: '1',
  
  //Firebase URL
  fireBaseUrl: 'https://exaltly.firebaseio.com/',  
  firebaseAccessToken: '252QIQnLpvTlFTvcFr8svkZozRD5a3ld58Q684qP',
  
  //Smtp Config
  smtpConfig : {
    host: '',
    port: 25,
    secure: false, // use SSL 
    auth: {
        user: '',
        pass: ''
    }
  },
  
  //contact email
  mailTo: 'joelsfoster@gmail.com',
  //notifciatonFormEmail
  notificaitonFormEmail: 'donotreply@exalt.ly',
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
