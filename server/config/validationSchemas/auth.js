var auth = {
    signup: {
        firstname: {
            in: ['body'],
            errorMessage: 'Invalid first name',
            isString: true
        },
        lastname: {
            in: ['body'],
            errorMessage: 'Invalid last name',
            isString: true
        },
        gender: {
            in: ['body'],
            errorMessage: 'Invalid gender name. Must be either male, female or prefer not to say',
            isString: true,
            isIn: {
                options: ['male', 'female', 'prefer not to say']
            }
        },
        bio: {
            in: ['body'],
            errorMessage: 'Invalid bio name',
            isString: true
        },
        volunteerhours: {
            in: ['body'],
            errorMessage: 'Invalid volunteer hours',
            isInt: true
        },
        email: {
            in: ['body'],
            errorMessage: 'Invalid email',
            isEmail: true
        },
        password: {
            in: ['body'],
            errorMessage: 'Invalid password',
            isString: true
        },
        street: {
            in: ['body'],
            isString: true,
            optional: { options: { nullable: true } }
        },
        city: {
            in: ['body'],
            isString: true,
        },
        country: {
            in: ['body'],
            isString: true,
        }
    },
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
    profile: {
        token: {
            in: ['headers'],
            errorMessage: 'Invalid authentication token in request header',
            isString: true
        }
    }
};

module.exports = auth;


