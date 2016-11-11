const thoughts = require('thoughts');
const yoda = require('yoda-said');
const programmer = require('prog-quote');

/**
 * Important: register any new quote libraries here
 * key is the name of the library
 * value is a quote-getter function that returns an object in this shape:
 *   `{ author: <author of quote>, text: <text of the quote> }`
 */
const libs = {
  thoughts: getThoughtQuote,
  yoda: getYodaQuote,
  programmer: getProgrammerQuote
};

// return a pseudo-random integer between 0 (inclusive) and max (exclusive)
const getRandomInt = max => Math.floor(Math.random() * max);

const libnames = module.exports.libnames = Object.keys(libs);

module.exports.randomQuoteLibrary = () => {
  const randomInd = getRandomInt(libnames.length);
  return libnames[randomInd];
};

module.exports.getQuote = libname => {
  const lib = libs[libname];

  if (!lib) {
    return null;
  } else {
    return libs[libname]();
  }
};

function getThoughtQuote() {
  const result = thoughts.random();

  return {
    author: result.author,
    text: result.thought
  };
}

function getYodaQuote() {
  const result = yoda();

  return {
    author: 'Yoda',
    text: result
  };
}

function getProgrammerQuote() {
  const result = programmer().next().value;

  return {
    author: result.author,
    text: result.quote
  };
}
