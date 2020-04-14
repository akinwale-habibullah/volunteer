var apply = function(req, res) {
    return res.send({message: 'hello - apply'});
};

var getApplication = function(req, res) {
    return res.send({message: 'hello - getApplication'});
};

var getApplications = function(req, res) {
    return res.send({message: 'hello - getApplications'});
};

var editApplication = function(req, res) {
    return res.send({message: 'hello - editApplication'});
};

module.exports = {
    apply,
    getApplication,
    getApplications,
    editApplication
};
