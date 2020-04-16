var jwt = require('jwt-simple');
var helpers = require('../config/helpers');
var User = require('../models/userModel');

var signup = function(req, res) {
    helpers.checkForValidationErr(req, res);

    var email = req.body.email;
    var newUserObj = req.body;
    User.findOne({'email': email}, function(err, user){
        if (err) {
            return helpers.makeErrorResponse(500, JSON.stringify(err), res);
        } else {
            if (user) {
                return helpers.makeFailResponse(400, "Email already exists", res);
            } else {
                User.create(newUserObj, function(err, user) {
                    if(err) {
                        return helpers.makeErrorResponse(500, JSON.stringify(err), res);
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
    helpers.checkForValidationErr(req, res);

    var email = req.body.email;
    var password = req.body.password;
    User.findOne({'email': email}, function(err, user){
        if (err) {
            return helpers.makeErrorResponse(500, JSON.stringify(err), res);
        } else {
            if (!user) {
                return helpers.makeFailResponse(404, 'Incorrect login credentials', res);
            } else {
                user.comparePasswords(password, function(err, match) {
                    if(err || !match) return helpers.makeFailResponse(400, 'Incorrect login credentials', res) ;
                    
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
    helpers.checkForValidationErr(req, res);
    var decode = helpers.decodeToken(req, res);
    if(!decode) return;

    // TODO:
    // check if its own or admin using roles
    // 1 for admin
    // 3 for end user

    // get user details of user in request parameters
    User.findOne({'_id': req.params.userid}, function(err, user_obj) {
        if (err) {
            return helpers.makeErrorResponse(500, JSON.stringify(err), res);
        }

        if (!user_obj) {
            return helpers.makeFailResponse(400,  'Invalid userid in request parameters', res);
        }

        // TODO: Fetch relevant user info in jobs and applications
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
