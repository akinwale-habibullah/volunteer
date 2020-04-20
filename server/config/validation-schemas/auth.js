var auth = {
    login: {
        email: {
            in: ['body'],
            errorMessage: 'Invalid email',
            isEmail: true
        },
        password: {
            in: ['body'],
            errorMessage: 'Invalid password',
            isString: true
        }
    },
    signup: {
        email: {
            in: ['body'],
            errorMessage: 'Invalid email',
            isEmail: true
        },
        password: {
            in: ['body'],
            errorMessage: 'Invalid password',
            isString: true
        }
    },
    profile: {
        token: {
            in: ['headers'],
            errorMessage: 'Invalid authentication token in request header',
            isString: true
        }
    }
};

module.exports = auth;


