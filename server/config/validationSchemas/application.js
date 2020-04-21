const application = {
    apply: {
        job_id: {
            in: ['body'],
            errorMessage: 'Invalid job id',
            isString: true
        },
        hours_commitment_per_week: {
            isInt: {
                options: {
                    min: 1,
                    max: 10
                },
                errorMessage: 'Invalid hours required per week. It should be at least 1 and at most 10',
            },
        },
        motivation: {
            in: ['body'],
            errorMessage: 'Invalid motivation letter. Minimum is 100 letter write up, maximum of 500 letter write up',
            isLength: {
                options: {
                    min: 100,
                    max: 500
                }
            }
        }
    }
};

module.exports = application;
