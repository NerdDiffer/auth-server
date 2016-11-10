module.exports = (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    const msg = "You must send a 'name' and 'password'";
    return res.status(400).json(msg);
  } else {
    next();
  }
};
