const jwt = require('jwt-simple');
const createError = require('http-errors');
const { validationResult } = require('express-validator');

/**
 * Checks if the first date is earlier than the last date
 * @param {string} start_date 
 * @param {string} end_date 
 * 
 * @returns boolean
 */
const compareDate = function(start_date, end_date){
    const start = new Date(start_date);
    const end = new Date(end_date);

    return start < end;
}
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
    compareDate: compareDate,
    checkForValidationErr: checkForValidationErr,
    validateToken: validateToken
};