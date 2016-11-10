const passport = require('passport');
const localStrategy = require('./localStrategy');

passport.use(localStrategy);

module.exports = passport;
