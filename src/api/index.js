const { Router } = require('express');

const router = Router();

router.get('/ping', (req, res) => {
  const msg = 'The server is up';
  res.json(msg);
});

module.exports = router;
