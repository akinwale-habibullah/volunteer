var app = require('./server/server');
var mongoose = require('mongoose');

var dbConfig = require('./server/config/db');

// connect db
mongoose.connect(dbConfig.url);

// set port
var port = process.env.PORT || 1337

// listen on port
app.listen(port, function() {
    console.log("Server is listening on port " + port);
});
