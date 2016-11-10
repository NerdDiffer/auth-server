const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('./api');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ type: '*/*' }));

// Routes
app.use(api)

// Set up server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => console.log('Server is listening on port', PORT));
