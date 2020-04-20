const jwt = require('jwt-simple');
const createError = require('http-errors');
const helpers = require('../config/helpers');
const User = require('../models/userModel');

const signup = async function(req, res) {
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

const signin = async function(req, res) {
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

const profile = async function(req, res) {
    // TODO:
    // check if its own or admin using roles
    // 1 for admin
    // 3 for end user

    // get user details of user in request parameters
    let userObj;
    try {
        userObj = await (await User.findOne({'_id': req.decodedToken._id}));
    } catch (error) {
        throw createError(404, error.message);
    }
    if(!userObj) throw createError(404, 'Invalid userid path parameter');

    res.json({
        status: 'success',
        data: {
            _id: userObj._id,
            name: userObj.name,
            email: userObj.email,
            role: userObj.role,
            jobs: userObj.jobs,
            applications: userObj.applications,
            gender: userObj.gender,
            volunteerHours: userObj.volunteer_hours,
            createdAt: userObj.created_at,
            updatedAt: userObj.updatedAt
        }
    });    
};

module.exports = {
    signin,
    signup,
    profile
};
