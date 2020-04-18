var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        last: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
    },
    email: {
        type: String,
        trim: true,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: String,
    address: {
        street: String,
        city: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        country:{
            type: String,
            lowercase: true,
            trim: true,
            required: true
        }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'prefer not to say']
    },
    bio: {
        type: String,
        minLength: 100,
        maxLength: 500
    },
    role: {
        type: Number, 
        min: 1,
        max: 3,
        required: true,
        default: 3
    },
    volunteer_hours: {
        type: Number,
        max: 12,
        min: 1
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
}, {timestamps: true});

UserSchema.methods.comparePasswords = function(enteredPassword, callback){
    var hashedPassword = this.password;

    bcrypt.compare(enteredPassword, hashedPassword, function(err, match) {
        callback(err, match);
    });
};

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified) {
        return next();
    };

    bcrypt.genSalt(10, function(err, salt) {
        if(err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) {
                return next(err);
            }

            user.password = hash;
            user.salt = salt;
            next();
        })
    });
});

module.exports = mongoose.model('User', UserSchema);
