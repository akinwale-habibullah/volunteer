var make_response = function(status_code, message, status, res) {
    return res.status(status_code).json({
        status,
        data: { message }
    });
};

module.exports = {
    make_response
};