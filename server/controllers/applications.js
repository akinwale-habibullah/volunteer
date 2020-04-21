const createError = require('http-errors');
const Application = require('../models/applicationModel');
const Job = require('../models/jobModel');
const User = require('../models/userModel');
const helpers = require('../config/helpers');

const apply = async function(req, res) {
    console.log(req.body);
    const errors = helpers.checkForValidationErr(req);
    if(errors) {
        throw createError(400, {message: errors.errors});
    };

    let job;
    try {
        job = await Job.findOne({_id: req.body.job_id});
    } catch (error) {
        throw createError(400, error.message);
    }

    if (!job) throw createError(404, 'Invalid job id. This job does not exist.');

    const  application =  new Application({
        job_id: req.body.job_id,
        applicant_id: req.decodedToken._id,
        hours_commitment_per_week: req.body.hours_commitment_per_week,
        motivation: req.body.motivation,
    });
    try {
       application.save();
    } catch (error) {
        throw createError(400, error.message);
    }

    res.json({
        status: 'success',
        data: {
            _id: application._id,
            applicant_id: req.decodedToken._id,
            job_id: application.job_id,
            job_role: job.job_role,
            hours_commitment_per_week: application.hours_commitment_per_week,
            motivation: application.motivation
        }
    });
};

const getApplication = async function(req, res) {
    applicationid = req.params.applicationid;
    let application;

    try {
        application = await Application.findOne({_id: applicationid});
    } catch (error) {
        throw createError(400, 'Invalid application id');
    }

    if(!application) throw createError(404, 'Invalid application id. This application does not exist');

    res.json({
        status: 'success',
        data: application
    });
};

const getApplications = async function(req, res) {
    let applications;
    try {
        applications = await Application.find({});
    } catch (error) {
        throw createError(400, error);
    }
    
    return res.json({
        status: 'success',
        data: applications
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

const editApplication = async function(req, res) {
    let application;
    const applicationid = req.params.applicationid;

    try {
        application = await Application.findOne({_id: applicationid});
    } catch (error) {
        throw createError(400, error.message);
    }

    if(!application) throw createError(404, 'Invalid application id.');
    if(application.applicant_id.toString() != req.decodedToken._id) throw createError(404, 'Only the application who created this record is allowed to edit it.');

    application.hours_commitment_per_week = req.body.hours_commitment_per_week || application.hours_commitment_per_week;
    application.motivation = req.body.motivation || application.motivation;

    try {
        await application.save()
    } catch (error) {
        throw createError(400, error.message);
    }

    res.json({
        status: 'success',
        data: application
    });
};

const deleteApplication = async function(req, res) {
    let application;
    const applicationid = req.params.applicationid;

    try {
        application = await Application.findOne({_id: applicationid});
    } catch (error) {
        throw createError(400, error.message);
    }

    if(!application) throw createError(404, 'Invalid application id. This application doesn\'t exist');
    if(application.applicant_id.toString() != req.decodedToken._id.toString()) throw createError(400, 'Unauthorized. Only the creator of this application is allowed to delete it');

    try {
        delete application;
        await Application.findOneAndDelete({_id: applicationid});
    } catch (error) {
        throw createError(400, error.message);
    }

    res.json({
        status: 'success',
        data: null
    });
};

module.exports = {
    apply,
    getApplication,
    getApplications,
    getJobApplications,
    getUserApplications,
    editApplication,
    deleteApplication,
};
