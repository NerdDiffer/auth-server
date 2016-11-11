// You'll want to use another implementation if you're serious about encrypting

const crypto = require('crypto');

const ALGO = 'aes256';
const DATA = 'top secret';

module.exports.encrypt = password => {
  const cipher = crypto.createCipher(ALGO, DATA);

  const inputEnc = 'utf8';
  const outputEnc = 'hex';

  let result = cipher.update(password, inputEnc, outputEnc);
  result += cipher.final(outputEnc);

  return result;
};
