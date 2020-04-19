const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { checkSchema } = require('express-validator');

const userController = require('../controllers/user');
const jobsController = require('../controllers/jobs');
const applicationsController = require('../controllers/applications');

const authValidationSchema = require('./validation-schemas/auth');

function addRoutes (app, express) {

    /**
     * Front end app
     */
    app.get('/', function(res, res) {
        filepath = path.join(process.cwd(), 'client', 'index.html');
        res.sendFile(filepath);
    });

    /**
     * API documentation
     */
    const swaggerDocument = YAML.load(path.join(process.cwd(), 'server', 'swagger.yaml'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    /**
     * API Endpoints
     */
    //POST - signup
    app.post('/api/v1/auth/signup', checkSchema(authValidationSchema.signup) , userController.signup);
    // POST - signin
    app.post('/api/v1/auth/signin', checkSchema(authValidationSchema.login), userController.signin);
    //GET - profile
    app.get('/api/v1/users/:userid/profile', checkSchema(authValidationSchema.profile), userController.profile);

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
    // GET - one application
    app.get('/api/v1/applications/:applicationid', applicationsController.getApplication);
    // GET - all applications
    app.get('/api/v1/applications', applicationsController.getApplications);
    // GET - job applications
    app.get('/api/v1/jobs/:jobid/applications', applicationsController.getJobApplications);
    // GET - user applications
    app.get('/api/v1/users/:userid/applications', applicationsController.getUserApplications);
    // PATCH - applications
    app.patch('/api/v1/applications/:applicationid', applicationsController.editApplication);
    // DELETE - applications
    app.delete('/api/v1/applications/:applicationid', applicationsController.editApplication);
};

module.exports = addRoutes;