const debug = require('debug')('auth-service');
const User = require('../db/models/User');

// POST /signup
module.exports.createNewUser = (req, res, next) => {
  const { name, password } = req.body;

  return User.save(name, password)
    .then(user => {
      debug('new user: %o', user);
      res.json({ name: user.name });
    })
    .catch(err => {
      const msg = err.toString();
      res.status(422).json(msg);
    });
};
