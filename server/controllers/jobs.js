var Job = require('../models/jobModel');
var makeResponse = require('../config/helpers');

//  TODO:
//      Add validation library - joi
//      Create validator directory for all schemas
//      NICE TO HAVE: Add methods to Job, to make these controllers even smaller. 


var addJob = function(req, res) {
    // get user id
    var newJobObject = req.body;

    Job.create(newJobObject, function(err, jobObject) {
        if(err) return makeResponse.makeResponse(500, err.message, 'fail', res);

        res.status(201).json({
            status: 'success',
            data: jobObject
        });
    });
};

var getOneJob = function(req, res) {
    // get jobid from req params
    var jobid = req.params.jobid;

    // search db for _id equals our jobid
    Job.findOne({_id: jobid}, function(err, jobObject) {
        if(err) return makeResponse(400, JSON.stringify(err), 'fail', res);

        // return HTTP response.
        return res.json({
            status: 'success',
            data: jobObject
        });
    });
};

var getJobs = function(req, res) {
    // search db for _id equals our jobid
    Job.find({}, function(err, jobObject) {
        if(err) return makeResponse(400, JSON.stringify(err), 'fail', res);

        // return HTTP response.
        return res.json({
            status: 'success',
            data: jobObject
        });
    });
};

var updateJob = function(req, res) {
    // get jobid from req params
    var jobid = req.params.jobid;
    var update = req.body;

    // search db for _id equals our jobid
    Job.findOneAndUpdate({_id: jobid}, update, { new: true }, function(err, jobObject) {
        if(err) return makeResponse(400, JSON.stringify(err), 'fail', res);

        // return HTTP response.
        return res.json({
            status: 'success',
            data: jobObject
        });
    });
};

var deleteJob = function(req, res) {
    // get jobid from req params
    var jobid = req.params.jobid;

    // search db for _id equals our jobid
    Job.findOneAndDelete({_id: jobid}, {useFindAndModify: false}, function(err, deletedJob) {
        if(err) return makeResponse(400, JSON.stringify(err), 'fail', res);

        // return HTTP response.
        return res.json({
            status: 'success',
            data: deletedJob
        });
    });
};

var selectApplication = function(req, res){
    // get jobid from req params
    var jobid = req.params.jobid;
    // get application id
    var applicationid = req.body.applicationid;

    // get job record
    Job.findOne({_id: jobid}, function(err, jobObject){
        if(err) return makeResponse(400, JSON.stringify(err), 'fail', res);

        // update application id as selected
            // jobObject['staffed_user'] = applicationid;
        // update other ids as not selected
        // update job with selected applicant id

        Job.update({_id: jobObject._id}, jobObject, function(err, raw) {
            if(err) console.log(JSON.stringify(err));

            console.log(raw);
        });
    });
    var update = req.body.applicationid;
};

var updateJobStatus = function(req, res) {
    return res.send({message: 'hello - updateJobStatus'});
};

var updateJobTimeFrame = function(req, res) {
    return res.send({message: 'hello - updateJobStatus'});
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
    selectApplication
};
