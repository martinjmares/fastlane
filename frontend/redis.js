/**
 * Connected redis client.
 */

var Redis = require('ioredis');
var config = require('./config');

var redis = new Redis(config.redisPort, config.redisHost);

module.exports = redis;
