var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    job_role: {
        type: String,
        lowercase: true,
        index: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String
    },
    location: {
        city: {
            type: String,
            required: true
        },
        street: String,
        country:{
            type: String,
            lowercase: true,
            trim: true,
            required: true
        }
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hours_required_per_week: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    application_end_date: {
        type: Date,
        validate: function() {
            return this.application_end_date < this.start_date;
        },
        required: true
    },
    end_date: {
        type: Date,
        validate: function() {
            return this.start_date < this.end_date && this.application_end_date < this.end_date;
        },
        required: true
    },
    staffing_status: {
        type: String,
        enum: ['open', 'closed'],
        required: true,
        default: 'open'
    },
    application_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
}, {timestamps: true});

module.exports = mongoose.model('Job', schema);
