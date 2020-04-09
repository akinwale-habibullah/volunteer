var addJob = function(req, res) {
    return res.send({message: 'hello - addJob'});
};

var getOneJob = function(req, res) {
    return res.send({message: 'hello - getOneJob'});
};

var getJobs = function(req, res) {
    return res.send({message: 'hello - getJobs'});
};

var updateJob = function(req, res) {
    return res.send({message: 'hello - updateJob'});
};

var deleteJob = function(req, res) {
    return res.send({message: 'hello - deleteJob'});
};

var updateJobStatus = function(req, res) {
    return res.send({message: 'hello - updateJobStatus'});
};

var updateJobTimeFrame = function(req, res) {
    return res.send({message: 'hello - updateJobStatus'});
};

var staffApplicant = function(req, res){
    return res.send({message: 'hello - staffApplicant'});
};

module.exports = {
    addJob,
    getOneJob,
    getJobs,
    updateJob,
    deleteJob,
    getJobs,
    updateJobStatus,
    updateJobTimeFrame,
    staffApplicant
};
