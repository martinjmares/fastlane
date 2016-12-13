
var env = process.env.NODE_ENV;
if (env == null) {
    env = "development";
}
console.log("ENV: " + env)
var config = require('./config.json')[env];

module.exports = config;
