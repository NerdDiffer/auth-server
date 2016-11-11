const debug = require('debug')('auth-service');
const { Strategy, ExtractJwt } = require('passport-jwt');

const User = require('../../db/models/User');
const secret = 'top secret';

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

/**
 * Function to run once the JWT has been decoded by the stategy.
 * @param payload, {String} the decoded JWT
 * @param done, {Function} what to do when you are done retrieving use from db
 *   this will be called whether or not there is an error.
 *   if valid: call `done(user)`
 *   if not valid: call `done(null, false)`
 */
const verify = (payload, done) => {
  debug('payload.sub %o', payload.sub);

  return User.findById(payload.sub)
    .then(user => {
      debug('user %o', user);

      if (!user) {
        return done(null, false); // no user with that id
      } else {
        return done(null, user);
      }
    })
    .catch(err => done(null, false)) // db error
};

const strategy = new Strategy(options, verify);

module.exports = strategy;
