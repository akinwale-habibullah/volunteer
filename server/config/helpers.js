var jwt = require('jwt-simple');
var { validationResult } = require('express-validator');

var failResponse = function(status_code, message, res) {
    res.status(status_code);
    return res.json({
        status: "fail",
        data: { message }
    });
};

var errorResponse = function(status_code, message, res) {
    res.status(status_code)
    return res.json({
        status: "error",
        error: { message }
    });
};

var checkForValidationErr = function(req, res){
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return errors;
    };

    return null;
}

var validationErrResponse = function(errors, res){
    return res.status(400).json({
        status: 'fail',
        errors: errors.errors
    });
}

var decodeToken = function(req, res, next){
    // decode token
    let decoded;

    try {
        decoded = jwt.decode(req.headers.token, 'secret');
    } catch (error) {
        return errorResponse(400, error.message, res);
    }

    if(!decoded) {
        return failResponse(400, 'Missing token in request header', res)
    };

    req.decodedToken = decoded;
    next();
}

module.exports = {
    errorResponse: errorResponse,
    failResponse: failResponse,
    validationErrResponse: validationErrResponse,
    checkForValidationErr: checkForValidationErr,
    decodeToken: decodeToken
};