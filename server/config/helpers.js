var jwt = require('jwt-simple');
var { validationResult } = require('express-validator');

var makeResponse = function(status_code, message, status, res) {
    return res.status(status_code).json({
        status,
        data: { message }
    });
};

var makeFailResponse = function(status_code, message, status, res) {
    return res.status(status_code).json({
        status: "fail",
        data: { message }
    });
};

var makeErrorResponse = function(status_code, message, status, res) {
    return res.status(status_code).json({
        status: "error",
        error: { message }
    });
};

var checkForValidationErr = function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) return validationErrResponse(errors, res);
}

var validationErrResponse = function(errors, res){
    return res.status(400).json({
        status: 'fail',
        errors: errors.errors
    });
}

var decodeToken = function(req, res){
    // decode token
    var decoded;
    try {
        decoded = jwt.decode(token, 'secret');
    } catch (error) {
        makeFailResponse(400, JSON.stringify(err), res);
        return;
    }

    return decoded;
}

module.exports = {
    makeResponse: makeResponse,
    makeErrorResponse: makeErrorResponse,
    makeFailResponse: makeFailResponse,
    validationErrResponse: validationErrResponse,
    checkForValidationErr: checkForValidationErr,
    decodeToken: decodeToken
};