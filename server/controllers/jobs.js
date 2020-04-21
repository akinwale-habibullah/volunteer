const createError = require('http-errors');
const ObjectID = require('mongoose').mongo.ObjectID;
const helpers = require('../config/helpers');
const Job = require('../models/jobModel');
const User = require('../models/userModel');
const Application = require('../models//applicationModel');

const addJob = async function(req, res) {
    const errors = helpers.checkForValidationErr(req);
    if(errors) {
        throw createError(400, {message: errors.errors});
    };

    if(!helpers.compareDate(req.body.application_end_date, req.body.start_date)){
        throw createError(400, 'Application start date cannot be later than job start date');
    }
    if(!helpers.compareDate(req.body.application_end_date, req.body.end_date)){
        throw createError(400, 'Application start date cannot be later than job end date');
    }
    if(!helpers.compareDate(req.body.start_date, req.body.end_date)){
        throw createError(400, 'Job end date cannot be earlier than job start date');
    }

    // get user id
    let newJobObject;
    newJobObject = new Job({
        job_role: req.body.job_role,
        description: req.body.description,
        requirements: req.body.requirements,
        location: {
            street: req.body.street || null,
            city: req.body.city,
            country: req.body.country
        },
        creator_id: req.decodedToken._id,
        hours_required_per_week: req.body.hours_required_per_week,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        application_end_date: req.body.application_end_date
    });
    
    try {
        await newJobObject.save();
    } catch (error) {
        throw createError(500, error.message);
    }

    res.status(201).json({
        status: 'success',
        data: newJobObject
    });
};

const getJobs = async function(req, res) {
    // search db for _id equals our jobid
    let jobs;
    try {
        jobs = await Job.find({staffing_status: 'open'});
    } catch (error) {
        throw createError(500, error.message);
    }


    res.json({
        status: 'success',
        data: jobs
    });
};

const getOneJob = async function(req, res) {
    let job;
    const jobid = req.params.jobid;

    try {
        job = await Job.findOne({_id: jobid});
        console.log(job);
    } catch (error) {
        throw createError(400, 'Invalid job id');
    }

    if(!job) throw createError(404, 'Invalid job id');

    res.json({
        status: 'success',
        data: job
    });
};

const updateJob = async function(req, res) {
    const errors = helpers.checkForValidationErr(req);
    if(errors) {
        throw createError(400, {message: errors.errors});
    };

    // get jobid from req params
    const job = await Job.findOne({_id: req.params.jobid});
    if(!job) throw createError(404, 'Invalid job id');

    const update = {
        job_role: req.body.job_role || job.job_role,
        description: req.body.description || job.description,
        requirements: req.body.requirements || job.requirements,
        location: {
            street: req.body.street || job.location.street,
            city: req.body.city || job.location.city,
            country: req.body.country || job.location.country
        },
        hours_required_per_week: req.body.hours_required_per_week || job.hours_required_per_week,
        start_date: req.body.start_date || job.start_date,
        end_date: req.body.end_date || job.end_date,
        application_end_date: req.body.application_end_date || job.application_end_date
    };

    if(!helpers.compareDate(update.application_end_date, update.start_date)){
        throw createError(400, 'Application start date cannot be later than job start date');
    };
    if(!helpers.compareDate(update.application_end_date, update.end_date)){
        throw createError(400, 'Application start date cannot be later than job end date');
    };
    if(!helpers.compareDate(update.start_date, update.end_date)){
        throw createError(400, 'Job end date cannot be earlier than job start date');
    };

    let updateJob;
    try {
        updateJob = await Job.findOneAndUpdate({_id: req.params.jobid}, update, function(err, document) {
            return new Promise(function(resolve, reject){
                if(err) return reject(err);
    
                resolve(document);
            });
        });
    } catch (error) {
        throw createError(400, err.message);
    }
    
    res.json({
        status: 'success',
        date: updateJob
    });
};

const deleteJob = async function(req, res) {
    let job;
    try {
        job = await Job.findOne({_id: req.params.jobid});
    } catch (error) {
        throw createError(400, 'Invalid job id');
    }

    if(!job) throw createError(404, 'Invalid job id');

    if(!(req.decodedToken._id == job.creator_id)) {
        if (req.decodedToken.role == 1) {
            throw createError(400, 'Only the job creator or admin is allowed to delete a job');
        }
    }

    try {
        job = Job.findOneAndDelete({_id: req.params.jobid}, function(err, deletedJob) {
            return new Promise(function(resolve, reject) {
                if(err) return reject(err);

                return resolve(deletedJob);
            });
        });
    } catch (error) {
        throw createError(400, err.message);
    }

    return res.json({
        status: 'success',
        data: null
    });
};

const selectApplicant = async function(req, res){
    const jobid = req.params.jobid;
    const applicationid = req.params.applicationid;

    let job
    try {
        job = await Job.findOne({_id: jobid});
    } catch (error) {
        throw createError(400, error);
    }

    if (!job) throw createError(400, 'Invalid job id');
    // if (job._id != req.decodedToken._id) createError(400, 'Unauthorized. Only the job owner can edit this job record');

    let application;
    try {
        application = await Application.findOne({_id: applicationid});
    } catch (error) {
        throw createError(400, error);
    }

    if (!application.job_id.equals(job._id)) {
        throw createError(400, 'This application is not for this job');
    }

    try {
        job.application_id = application._id;
        await job.save();
    } catch (error) {
        throw createError(400, error.message);
    }

    res.json({
        status: 'success',
        data: null
    });
};

const updateJobStatus = function(req, res) {
    return res.send({message: 'hello - updateJobStatus'});
};

const updateJobTimeFrame = function(req, res) {
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
    selectApplicant
};
