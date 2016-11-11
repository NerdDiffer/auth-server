const jwt = require('jsonwebtoken');
const { promisify } = require('bluebird');

const signAsync = promisify(jwt.sign);

const secret = 'top secret';

module.exports.generateTokenAsync = input => {
  const payload = {
    sub: input,
    iat: Date.now()
  };
  const options = { expiresIn: '12h' };

  return signAsync(payload, secret, options);
};
