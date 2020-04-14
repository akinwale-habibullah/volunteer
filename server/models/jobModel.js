var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var schema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    creator_id: String,
    hours_required_per_week: Number,
    start_date: Date,
    end_date: Date,
    created_at: {
        type: Date,
        default: Date.now
    },
    status: String,
    staffed_user: Number
});

module.exports = mongoose.model('Job', schema);
