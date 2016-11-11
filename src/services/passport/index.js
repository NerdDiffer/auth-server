const passport = require('passport');
const localStrategy = require('./localStrategy');
const jwtStrategy = require('./jwtStrategy');

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = passport;
