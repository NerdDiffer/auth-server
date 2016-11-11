const debug = require('debug')('auth-service');
const { getQuote, randomQuoteLibrary, libnames } = require('../services/quotes');

// GET /quotes, GET /quotes/:libname
module.exports.showQuote = (req, res) => {
  const { libname } = req.params;

  if (!libname) {
    const nameOfLib = randomQuoteLibrary();
    const quote = getQuote(nameOfLib);
    res.json({ libname: nameOfLib, quote });
  } else {
    const quote = getQuote(libname);

    if (!quote) {
      const names = libnames.join(', ')
      const msg = `Please send a valid request for one of these: ${names}`
      res.status(400).json(msg)
    } else {
      res.json({ libname, quote });
    }
  }
};
