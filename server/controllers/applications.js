var addApplication = function(req, res) {
    return res.send({message: 'hello - addApplication'});
};

var getApplications = function(req, res) {
    return res.send({message: 'hello - getApplications'});
};

var editApplication = function(req, res) {
    return res.send({message: 'hello - editApplication'});
};


module.exports = {
    addApplication,
    getApplications,
    editApplication
};
