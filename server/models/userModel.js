var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    email: String,
    password: String,
    imageUrl: String,
    location: String,
    gender: String,
    expertise: String,
    volunteer_hours: Number
});
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
