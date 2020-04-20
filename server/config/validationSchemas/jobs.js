const jobs = {
    create: {
        job_role: {
            in: ['body'],
            errorMessage: 'Invalid job role',
            isString: true
        },
        description: {
            in: ['body'],
            errorMessage: 'Invalid description',
            isString: true
        },
        requirements: {
            in: ['body'],
            errorMessage: 'Invalid job requirements',
            isString: true
        },
        street: {
            in: ['body'],
            errorMessage: 'Invalid street',
            isString: true,
            optional: { options: { nullable: true } }
        },
        city: {
            in: ['body'],
            errorMessage: 'Invalid city',
            isString: true,
        },
        country: {
            in: ['body'],
            errorMessage: 'Invalid country',
            isString: true,
        },
        hours_required_per_week: {
            in: ['body'],
            isInt: {
                options: {
                    min: 1,
                    max: 10
                },
                errorMessage: 'Invalid hours required per week',
            },
        },
        start_date: {
            in: ['body'],
            errorMessage: 'Invalid start date. Format:: YYYY-MM-DD',
            isISO8601: true
        },
        end_date: {
            in: ['body'],
            errorMessage: 'Invalid start date. Format:: YYYY-MM-DD',
            isISO8601: true
        },
        application_end_date: {
            in: ['body'],
            errorMessage: 'Invalid start date. Format:: YYYY-MM-DD',
            isISO8601: true
        }
    },
    edit: {
        job_role: {
            in: ['body'],
            errorMessage: 'Invalid job role',
            isString: true,
            optional: { options: { nullable: false } }
        },
        description: {
            in: ['body'],
            errorMessage: 'Invalid description',
            isString: true,
            optional: { options: { nullable: false } }
        },
        requirements: {
            in: ['body'],
            errorMessage: 'Invalid job requirements',
            isString: true,
            optional: { options: { nullable: false } }
        },
        street: {
            in: ['body'],
            errorMessage: 'Invalid street',
            isString: true,
            optional: { options: { nullable: false } }
        },
        city: {
            in: ['body'],
            errorMessage: 'Invalid city',
            isString: true,
            optional: { options: { nullable: false } }
        },
        country: {
            in: ['body'],
            errorMessage: 'Invalid country',
            isString: true,
            optional: { options: { nullable: false } }
        },
        hours_required_per_week: {
            in: ['body'],
            optional: { options: { nullable: false } },
            isInt: {
                options: {
                    min: 1,
                    max: 10
                },
                errorMessage: 'Invalid hours required per week',
            },
        },
        start_date: {
            in: ['body'],
            errorMessage: 'Invalid start date. Format:: YYYY-MM-DD',
            isISO8601: true,
            optional: { options: { nullable: false } }
        },
        end_date: {
            in: ['body'],
            errorMessage: 'Invalid start date. Format:: YYYY-MM-DD',
            isISO8601: true,
            optional: { options: { nullable: false } }
        },
        application_end_date: {
            in: ['body'],
            errorMessage: 'Invalid start date. Format:: YYYY-MM-DD',
            isISO8601: true,
            optional: { options: { nullable: false } }
        }
    },
};

module.exports = jobs;
