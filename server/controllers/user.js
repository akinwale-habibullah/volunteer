var jwt = require('jwt-simple');
var User = require('../models/userModel');
var helpers = require('../config/helpers');

var signup = function(req, res) {
    var email = req.body.email;
    var newUserObj = req.body;

    User.findOne({'email': email}, function(err, user){
        if (err) {
            console.log('mongo findOne signup err: ', err);
            res.status(400);
            return res.json({
                status: 'fail',
                data: {
                    message: err
                }
            });
        } else {
            if (user) {
                res.status(400);
                return res.json({
                    status: 'fail',
                    data: {
                        message: "Email already taken"
                    }
                });
            } else {
                User.create(newUserObj, function(err, user) {
                    if(err) {
                        console.log("mongo create user err: ", err);
                        return res.json(err);
                    }

                    var token = jwt.encode(user, 'secret');
                    res.json({
                        status: 'success',
                        data: {
                            token: token,
                            userid: user['_id']
                        }
                    });
                });
            }
        }
    });
};

var signin = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({'email': email}, function(err, user){
        if (err) {
            console.log('mongo findOne signup err: ', err);
            res.status(400);
            return res.json({
                status: 'fail',
                data: {
                    message: err
                }
            });
        } else {
            if (!user) {
                res.status(400);
                return res.json({
                    status: 'fail',
                    data: {
                        message: "Incorrect login credentials"
                    }
                });
            } else {
                user.comparePasswords(password, function(err, match) {
                    token = jwt.encode(user, 'secret');

                    res.json({
                        token,
                        userid: user['_id'],
                    });
                });
            }
        }
    });
};

var profile = function(req, res) {
    // validate req
    token = req.headers['token'];
    if (!token) {
        return helpers.make_response('fail', 'Invalid authentication token in request header', 400, res);
    };

    // decode token
    var decoded;
    try {
        decoded = jwt.decode(token, 'secret');
    } catch (error) {
        return helpers.make_response(400, error.message, 'fail', res);
    }

    // get user details of user in request parameters
    User.findOne({'_id': req.params.userid}, function(err, user_obj) {
        if (err) {
            return helpers.make_response(500, error.message, 'error', res);
        }

        if (!user_obj) {
            return helpers.make_response(400, 'Invalid userid in request parameters', 'fail', res);
        }

        res.json({
            status: 'success',
            data: {
                _id: user_obj._id,
                name: user_obj.email
            }
        });
    });
    
};

module.exports = {
    signin,
    signup,
    profile
};
