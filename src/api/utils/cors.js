const clientOrigin = 'http://localhost:8080';
const allowedHeaders = [
  'Origin',
  'X-Requested-With',
  'Content-Type',
  'Accept',
  'authorization'
].join(', ');

module.exports = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', clientOrigin);
  res.set('Access-Control-Allow-Headers', allowedHeaders);
  next();
};
