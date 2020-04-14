var makeResponse = function(status_code, message, status, res) {
    return res.status(status_code).json({
        status,
        data: { message }
    });
};

module.exports = {
    makeResponse
};