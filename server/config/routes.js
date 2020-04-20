const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const asyncHandler = require('express-async-handler')
const createError = require('http-errors');
const { checkSchema } = require('express-validator');

const userController = require('../controllers/user');
const jobsController = require('../controllers/jobs');
const applicationsController = require('../controllers/applications');

const authValidationSchema = require('./validation-schemas/auth');
const { validateToken } = require('../config/helpers');

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
     * API Endpoints - Auth
     */
    //POST - signup
    app.post('/api/v1/auth/signup', checkSchema(authValidationSchema.signup) , asyncHandler(userController.signup));
    // POST - signin
    app.post('/api/v1/auth/signin', checkSchema(authValidationSchema.login), asyncHandler(userController.signin));
    //GET - profile
    app.get('/api/v1/users/:userid/profile', validateToken, checkSchema(authValidationSchema.profile), asyncHandler(userController.profile));

    // POST - jobs
    app.post('/api/v1/jobs', validateToken, jobsController.addJob);
    // GET - jobs
    app.get('/api/v1/jobs', jobsController.getJobs);
    // GET - jobs/:jobid
    app.get('/api/v1/jobs/:jobid', validateToken, jobsController.getOneJob);
    // PATCH - jobs/:jobid
    app.patch('/api/v1/jobs/:jobid', validateToken, jobsController.updateJob);
    // DELETE - jobs/:jobid
    app.delete('/api/v1/jobs/:jobid', validateToken, jobsController.deleteJob);

    // OPTIONAL - NICE TO HAVES
    //  // PATCH - jobs/:jobid
    // app.patch('/api/v1/jobs/:jobid/status', jobsController.updateJobStatus);
    // // PATCH - jobs/:jobid/timeframe
    // app.patch('/api/v1/jobs/:jobid/timeframe', jobsController.updateJobTimeFrame);
    // // PATCH - jobs/:jobid/staffApplicant
    // app.patch('/api/v1/jobs/:jobid/staffapplicant', jobsController.staffApplicant);

    // POST - applications
    app.post('/api/v1/jobs/:jobid/apply', validateToken, applicationsController.apply);
    // GET - one application
    app.get('/api/v1/applications/:applicationid', validateToken, applicationsController.getApplication);
    // GET - all applications
    app.get('/api/v1/applications', validateToken, applicationsController.getApplications);
    // GET - job applications
    app.get('/api/v1/jobs/:jobid/applications', validateToken, applicationsController.getJobApplications);
    // GET - user applications
    app.get('/api/v1/users/:userid/applications', validateToken, applicationsController.getUserApplications);
    // PATCH - applications
    app.patch('/api/v1/applications/:applicationid', validateToken, applicationsController.editApplication);
    // DELETE - applications
    app.delete('/api/v1/applications/:applicationid', validateToken, applicationsController.editApplication);


    /**
     * 404 Handler
     */
    app.use((req, res, next) => {
        next(createError(404));
    });
    /**
     * Error Handler
     */
    app.use((error, req, res, next) => {
        console.log('Error handler function called');
        const statusErrorObject = {
            400: "fail",
            500: "error"
        };

        res.status(error.status || 500);
        return res.json({
            status: statusErrorObject[error.status],
            message: error.message
        });
    });
};

module.exports = addRoutes;