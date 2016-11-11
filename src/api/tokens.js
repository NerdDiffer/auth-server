const { generateTokenAsync } = require('../services/tokens');

module.exports.sendToken = (req, res, next) => (
  generateTokenAsync(req.user.id)
    .then(token => res.json({ token }))
    .catch(err => res.status(500).json(err))
);
