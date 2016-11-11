const { Router } = require('express');
const passportService = require('../services/passport');
const corsForClient = require('./utils/cors');
const checkUserParams = require('./utils/checkUserParams');
const users = require('./users');
const tokens = require('./tokens');

const router = Router();

router.use(corsForClient);

const authenticateCredentials = passportService.authenticate('local', {
  session: false
});

router.get('/ping', (req, res) => {
  const msg = 'The server is up';
  res.json(msg);
});

router.post('/register',
  checkUserParams,
  users.createNewUser,
  authenticateCredentials,
  tokens.sendToken
);

router.post('/login',
  checkUserParams,
  authenticateCredentials,
  tokens.sendToken
);

module.exports = router;
