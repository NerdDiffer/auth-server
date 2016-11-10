const { Router } = require('express');
const checkUserParams = require('./utils/checkUserParams');
const users = require('./users');

const router = Router();

router.get('/ping', (req, res) => {
  const msg = 'The server is up';
  res.json(msg);
});

router.post('/signup',
  checkUserParams,
  users.createNewUser
);

module.exports = router;
