const { Router } = require('express');
const corsForClient = require('./utils/cors');
const checkUserParams = require('./utils/checkUserParams');
const users = require('./users');

const router = Router();

router.use(corsForClient);

router.get('/ping', (req, res) => {
  const msg = 'The server is up';
  res.json(msg);
});

router.post('/signup',
  checkUserParams,
  users.createNewUser
);

module.exports = router;
