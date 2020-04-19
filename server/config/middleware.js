var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express) {
    app.use(morgan('dev'));

    // use bodyParser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // use express.static to serve client folder
    app.use(express.static(__dirname + '/../../client'));
};
