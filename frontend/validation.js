/**
 * Validation utils
 */

var redis = require("./redis");

var validation = {
    requireParams: function() {
        var args = arguments;
        return function (req, res, next) {
            var notFounds = [];
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (req.body[arg] == null) {
                    notFounds.push(arg);
                }
            }
            if (notFounds.length == 1) {
                var err = new Error('Missing parameter ' + notFounds.join() + "!");
                err.status = 422;
                next(err);
            } else if (notFounds.length > 1) {
                var err = new Error('Missing parameters: ' + notFounds.join(", ") + "!");
                err.status = 422;
                next(err);
            } else {
                next();
            }
        }
    },

    auth: function(role) {
        return function (req, res, next) {
            const AUTH_KEY = "fastlane-auth";
            var id = req.header(AUTH_KEY);
            if (id == null) {
                id = req.cookies[AUTH_KEY];
            }
            if (id == null) {
                // No ID then un-authorised
                var err = new Error('Authentication required!');
                err.status = 401;
                next(err);
            } else {
                redis.get("session:" + id, function (err, username) {
                    if (username == null) {
                        var err = new Error('Invalid or expired authentication!');
                        err.status = 401;
                        next(err);
                    } else {
                        req.auth = {
                            id: id,
                            username: username
                        }
                        if (role == null) {
                            // No specific privileges are required
                            next();
                        } else {
                            redis.sismember("user.roles:" + username, role, function(err2, valid) {
                                if (valid == 0) {
                                    var err = new Error('Insufficient privileges!');
                                    err.status = 401;
                                    next(err);
                                } else {
                                    next();
                                }
                            });
                        }
                    }
                })
            }
        }
    }
}

module.exports = validation;