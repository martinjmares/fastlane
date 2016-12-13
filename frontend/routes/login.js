var crypto = require('crypto')
var express = require('express');
var uuid = require('node-uuid');
var validation = require("../validation");
var redis = require('../redis')

const LOGIN_SESSION_MAX_AGE = 3600;

var router = express.Router();

// Real login. Creates new authentication session.
router.post('/',
    validation.requireParams("username", "password"),
    function(req, res, next) {
        redis.hget("user:" + req.body.username, "pass", function (redisErr, passmd5) {
            var hash = crypto.createHash('md5').update(req.body.password, "utf8").digest('hex');
            if (passmd5 == null || hash != passmd5) {
                var err = new Error("Invalid login request!");
                err.status = 404;
                next(err);
            } else {
                var authId = uuid.v4();
                redis.set("session:" + authId, req.body.username, "EX", LOGIN_SESSION_MAX_AGE);
                res.cookie('fastlane-auth', authId, { maxAge: (LOGIN_SESSION_MAX_AGE * 1000), httpOnly: true });
                res.json({username: req.body.username, auth: authId});
            }
        });
    });

// Update existing session timeout
router.get('/',
    validation.auth(),
    function(req, res) {
        redis.set("session:" + req.auth.id, req.auth.username, "EX", LOGIN_SESSION_MAX_AGE);
        res.cookie('fastlane-auth', req.auth.id, { maxAge: (LOGIN_SESSION_MAX_AGE * 1000), httpOnly: true });
        res.json({username: req.auth.username, auth: req.auth.id});
    }
)

module.exports = router;
