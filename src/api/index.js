const { Router } = require('express');
const users = require('./users');

const router = Router();

router.get('/ping', (req, res) => {
  const msg = 'The server is up';
  res.json(msg);
});

router.post('/signup', users.createNewUser);

module.exports = router;
