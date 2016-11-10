const debug = require('debug')('auth-service');
const Strategy = require('passport-local');
const User = require('../../db/models/User');

const options = {
  usernameField: 'name'
};

const cb = (name, password, done) => (
  User.findByName(name)
    .then(user => {
      const isMatch = User.arePasswordsTheSame(password, user.password);
      debug('Does password match? %o', isMatch);

      if (!isMatch) {
        return done(null, false); // not a match
      } else {
        return done(null, user); // found a match, here is the user
      }
    })
    .catch(err => {
      debug('Error message: %s', err);
      return done(null, false);
    })
);

const strategy = new Strategy(options, cb);

module.exports = strategy;
