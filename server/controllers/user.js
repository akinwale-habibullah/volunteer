var jwt = require('jwt-simple');
const createError = require('http-errors');
var helpers = require('../config/helpers');
var User = require('../models/userModel');

var signup = async function(req, res) {
    const errors = helpers.checkForValidationErr(req);
    if(errors) {
        throw createError(400, {message: errors.errors});
    };

    let email = req.body.email;
    let userObj;
    try {
        email = req.body.email;
        userObj = req.body;

        userObj = await User.findOne({'email': email});
    } catch (error) {
        throw createError(400, error.message);
    }

    if (userObj) {
        throw createError(400, "Email already exists"); 
    }

    let newUser;
    let token;
    try {
        newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: {
                first: req.body.firstname,
                last: req.body.lastname
            },
            address: {
                street: req.body.city || null,
                city: req.body.city,
                country: req.body.country
            },
            gender: req.body.gender,
            bio: req.body.bio,
            volunteer_hours: req.body.volunteerhours
        });
        await newUser.save();
    } catch (error) {
        throw createError(500, error);
    }

    token = jwt.encode({
        role: newUser.role,
        _id: newUser._id
    }, 'secret');
    res.status(201).json({
        status: 'success',
        data: {
            token: token,
            userid: newUser['_id']
        }
    });
};

var signin = async function(req, res) {
    const errors = helpers.checkForValidationErr(req);
    if(errors) {
        throw createError(400, {message: errors.errors});
    };

    const email = req.body.email;
    const password = req.body.password;
    let user;
    try {
        user = await User.findOne({'email': email});
    } catch (error) {
        throw createError(400, 'Incorrect login credentials');
    }

    if(!user) throw createError(400, 'Incorrect login credentials');

    const response = await user.comparePassword(password).then((success, err) => {
        if(err) return err;

        return success;
    });

    if(!response) throw createError(400, 'Incorrect login credentials');

    token = jwt.encode(user, 'secret');
    res.json({
        token: token,
        userid: user['_id'],
    });
};

var profile = async function(req, res) {
    const validationErrors = helpers.checkForValidationErr(req, res);
    if(validationErrors) return helpers.failResponse(400, validationErrors.errors, res);

    if(!req.decodedToken) {
        return helpers.failResponse(400, 'Missing token in request header', res)
    };

    // TODO:
    // check if its own or admin using roles
    // 1 for admin
    // 3 for end user

    // get user details of user in request parameters
    let userObj;
    try {
        userObj = await User.findOne({'_id': req.params.userid});
    } catch (error) {
        throw createError(404, error.message);
    }
    if(!userObj) throw createError(404, 'Invalid userid path parameter');

    res.json({
        status: 'success',
        data: {
            _id: userObj._id,
            name: userObj.email
        }
    });    
};

module.exports = {
    signin,
    signup,
    profile
};
