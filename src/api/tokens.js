const { generateTokenAsync } = require('../services/tokens');

module.exports.sendToken = (req, res, next) => {
  const { user } = req;
  return generateTokenAsync(user.id)
    .then(token => res.json({ token, name: user.name }))
    .catch(err => res.status(500).json(err))
};
