const redis = require('redis');
const { promisifyAll } = require('bluebird');
const debug = require('debug')('auth-service');

promisifyAll(redis.RedisClient.prototype);
const client = redis.createClient();

client.on('connect', () => debug('Redis client is connected'));
client.on('ready', () => debug('Redis client is ready'));
client.on('error', err => debug('Redis client error: %o', err));

module.exports = client;
