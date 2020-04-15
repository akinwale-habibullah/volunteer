var mongoose = require('mongoose');

/**
 * TODO:
 * 
 * Model relationship with Job and User models
 * Mark required fields
 * Add model functions to abstract CRUD functionality
 */
var ObjectId = mongoose.Schema.ObjectId;
var schema = new mongoose.Schema({
    job_id: ObjectId,
    user_id: ObjectId,
    hours_commitment_per_week: Number,
    motivation: String,
    status: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', schema);
