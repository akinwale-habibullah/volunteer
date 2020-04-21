const createError = require('http-errors');
const Application = require('../models/applicationModel');
const Job = require('../models/jobModel');
const User = require('../models/userModel');
const helpers = require('../config/helpers');

const apply = function(req, res) {
    var applicationObj = req.body;
    
    Job.findOne({_id: req.params.jobid}, function(err, data) {
        if(err) return helpers.makeResponse(400, JSON.stringify(err), 'fail', res);

        if(!data) return helpers.makeResponse(404, 'Invalid Job ID', 'fail', res);

        // create application with req body
        req.body["job_id"] = req.params.jobid;
        var newApplication = new Application(req.body);
        // return response
        newApplication.save(function(err, data) {
            if(err) {
                return helpers.makeResponse(404, JSON.stringify(err), 'fail', res)
            };

            res.status(201).json({
                status: 'success',
                data: data
            });
        })
    });
};

const getApplication = function(req, res) {
    applicationID = req.params.applicationid;

    Application.findOne({_id: applicationID}, function(err, data){
        if(err) return helpers.makeResponse(400, JSON.stringify(err), 'fail', res);

        if(!data) return helpers.makeResponse(404, 'Invalid Job ID', 'fail', res);

        return res.json({
            status: 'success',
            data
        });
    });
};

const getApplications = function(req, res) {
    Application.find({}, function(err, data){
        if(err) return helpers.makeResponse(404, JSON.stringify(err), 'fail', res);

        return res.json({
            status: 'success',
            data
        });
    });
};

const getJobApplications = async function(req, res) {
    let job;
    var jobid = req.params.jobid;

    try {
        job = await Job.findOne({_id: jobid})
    } catch (error) {
        throw createError(400, error);
    }

    if (!job.creator_id.toString() == req.decodedToken._id) {
        if(req.decodedToken.role != 3) throw createError(400, 'Only ')
    }

    let applications;
    try {
        applications = await Application.find({job_id: jobid})
    } catch (error) {
        throw createError(400, error);
    }
    console.log(applications);

    res.json({
        status: 'success',
        data: applications
    });
};

const getUserApplications = function(req, res) {
    // get user id from req.params
    var user_id = req.params.userid;
    // check user existence in the db
    // get applications with user_id
    // return http response
    User.findOne({_id: user_id}, function(err, data) {
        if(err) return helpers.makeResponse(400, JSON.stringify(err), 'error', res);
        if(!data) return helpers.makeResponse(404, 'Invalid user ID', 'fail', res);

        Application.findOne({user_id: user_id}, function(err, data){
            res.json({
                status: 'success',
                data
            });
        });
    });
};

const editApplication = function(req, res) {
    // get application id from req params
    var applicationId = req.params.applicationid;

    // check existence
    // change [hours_commitment_per_week, motivation]
    Application.findOne({_id: applicationId}, function(err, data) {
        if(err) return helpers.makeResponse(400, JSON.stringify(err), 'error', res);
        if(!data) return helpers.makeResponse(404, 'Invalid application ID', 'fail', res);

        data["hours_commitment_per_week"] = req.body["hours_commitment_per_week"] || data["hours_commitment_per_week"];
        data["motivation"] = req.body["motivation"] || data["motivation"];

        Application.findOneAndUpdate({_id: applicationId}, data, {new: true}, function(err, data) {
            if(err) return helpers.makeResponse(500, JSON.stringify(err), 'error', res);

            res.json({
                status: 'success',
                data
            })
        });
    });
};

const deleteAplication = function(req, res) {
    // get application from req params
    var applicationID = req.params.id;
    // check if application exists
    Application.findOne({_id: applicationID}, function(err, data) {
        if(err) return helpers.makeResponse(400, JSON.stringify(err), 'fail', res);
        if(!data) return helpers.makeResponse(404, 'Invalid Application ID', 'fail', res);

        Application.findOneAndDelete({_id, applicationID}, function(err, data){
            if(err) return helpers.makeResponse(500, JSON.stringify(err), 'fail', res);

            res.status(204);
            res.json({
                status: 'success',
                data: null
            });
        })
    });
    // delete application
    // return http response

    return res.send({message: 'hello - deleteApplications'});
};

module.exports = {
    apply,
    getApplication,
    getApplications,
    getJobApplications,
    getUserApplications,
    editApplication,
    deleteAplication,
};
