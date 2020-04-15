var path = require('path');
var userController = require('../controllers/user');
var jobsController = require('../controllers/jobs');
var applicationsController = require('../controllers/applications');

module.exports = function(app, express) {

    /**
     * Front end app
     */
    app.get('/', function(res, res) {
        filepath = path.join(process.cwd(), 'client', 'index.html');
        res.sendFile(filepath);
    });

    /**
     * API Endpoints
     */
    //POST - signup
    app.post('/api/v1/auth/signup', userController.signup);
    // POST - signin
    app.post('/api/v1/auth/signin', userController.signin);
    //GET - profile
    app.get('/api/v1/users/:userid/profile', userController.profile);

    // POST - jobs
    app.post('/api/v1/jobs', jobsController.addJob);
    // GET - jobs
    app.get('/api/v1/jobs', jobsController.getJobs);
    // GET - jobs/:jobid
    app.get('/api/v1/jobs/:jobid', jobsController.getOneJob);
    // PATCH - jobs/:jobid
    app.patch('/api/v1/jobs/:jobid', jobsController.updateJob);
    // DELETE - jobs/:jobid
    app.delete('/api/v1/jobs/:jobid', jobsController.deleteJob);

    // OPTIONAL - NICE TO HAVES
    //  // PATCH - jobs/:jobid
    // app.patch('/api/v1/jobs/:jobid/status', jobsController.updateJobStatus);
    // // PATCH - jobs/:jobid/timeframe
    // app.patch('/api/v1/jobs/:jobid/timeframe', jobsController.updateJobTimeFrame);
    // // PATCH - jobs/:jobid/staffApplicant
    // app.patch('/api/v1/jobs/:jobid/staffapplicant', jobsController.staffApplicant);

    // POST - applications
    app.post('/api/v1/jobs/:jobid/apply', applicationsController.apply);
    // POST - applications
    app.get('/api/v1/jobs/:jobid/applications', applicationsController.getJobApplications);
    // GET - one application
    app.get('/api/v1/applications/:applicationid', applicationsController.getApplication);
    // GET - applications
    app.get('/api/v1/applications', applicationsController.getApplications);
    // PATCH - jobs
    app.post('/api/v1/applications/:applicationid', applicationsController.editApplication);
};
