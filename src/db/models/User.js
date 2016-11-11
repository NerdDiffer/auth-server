const debug = require('debug')('auth-service');
const client = require('../client');
const { isNameValid, isPasswordValid } = require('../utils/validation');
const { encrypt } = require('../../services/crypt');

// Redis key schema
const NEXT_ID = 'User:NEXT_ID';
const ID_TEMPLATE = 'User:ID';
const NAME_TO_ID = 'User:NAME_TO_ID';

const User = function (name, password) {
  this.name = name;
  this.password = encrypt(password);
};

User.arePasswordsTheSame = (plaintext, encryptedPassword) => (
  encrypt(plaintext) === encryptedPassword
);

User.validate = ({ name, password }) => (
  client.hexistsAsync(NAME_TO_ID, name)
    .then(result => {
      const exists = !!result;

      if (exists) {
        throw Error ('Name is already taken');
      }

      if (!isNameValid(name) || !isPasswordValid(password)) {
        throw Error ('Name or password is not valid');
      } else {
        return true;
      }
    })
);

User.save = (name, password) => (
  User.validate({ name, password })
    .then(() => client.incrAsync(NEXT_ID))
    .then(nextUserId => {
      debug('--- incremented NEXT_ID: %d', nextUserId)
      const user = new User(name, password);
      user.id = nextUserId;

      const key = `${ID_TEMPLATE}:${nextUserId}`;

      // Returns string 'OK'. Need the key in order to show the user
      client.hmset(key, user);
      client.hset(NAME_TO_ID, name, key);
      return key;
    })
    .then(key => {
      debug('--- showing user with key: %o', key);
      return client.hgetallAsync(key);
    })
);

User.findById = userIdKey => (
  client.hgetallAsync(userIdKey)
);

User.findByName = name => (
  client.hgetAsync(NAME_TO_ID, name)
    .then(key => {
      debug('User found?\n%o', !!key);
      debug('Here is key\n%o', key);

      if (!key) {
        throw Error ('No user found by that name');
      } else {
        return key;
      }
    })
    .then(key => client.hgetallAsync(key))
);

module.exports = User;
