const jwt = require('jwt-simple');
const createError = require('http-errors');
const { validationResult } = require('express-validator');

const checkForValidationErr = function(req){
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return errors
    };

    return null;
};
const validateToken = function(req, res, next){
    let decoded;
    
    try {
        decoded = jwt.decode(req.headers.token, 'secret');
    } catch (error) {
        throw createError(400, error.message);
    }

    if(!decoded) {
        throw createError(400, 'Missing token in request header');
    };

    req.decodedToken = decoded;
    next();
};

module.exports = {
    checkForValidationErr: checkForValidationErr,
    validateToken: validateToken
};