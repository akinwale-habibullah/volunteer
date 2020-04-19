var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    applicant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hours_commitment_per_week: {
        type: Number,
        min: 1,
        max: 12,
        required: true,
    },
    motivation: {
        type: String,
        minlength: 100,
        maxlength: 500,
        required: true
    },
    staffing_status: {
        type: String,
        enum: ['successful', 'unsuccessful', 'open'],
        default: 'open'
    }
}, {timestamps: true});

module.exports = mongoose.model('Application', schema);
