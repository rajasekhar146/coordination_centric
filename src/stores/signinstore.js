import Store from '../libs/store';
import get from 'lodash.get';
const apiURL = 'https://api.csuite.health'



const SigninStore = new Store({
    email: '',
    password: '',
    organisationName: ''
},
    [
        {
            label: 'RequestPassword',
            request: {
                // url: `${getEnvValue('API_URL')}/api`,
                url: `${apiURL}/users/forgotPassword`,
                method: 'post',
            },
            formatter(data, request, config) {
                const output = request;
                output.body = {
                    email: config.email.toLowerCase(),
                };
                return output;
            },
            error: (error) => {
                const err = {};
                err.status = error.status;
                return err;
            },
            parse: (data) => {
                return data;
            },
        },
        {
            label: 'ResetPassword',
            request: {
                // url: `${getEnvValue('API_URL')}/api`,
                url: `${apiURL}/users/forgotPassword`,
                method: 'post',
            },
            formatter(data, request, config) {
                const output = request;
                output.body = config.resetData;
                return output;
            },
            error: (error) => {
                const err = {};
                err.status = error.status;
                return err;
            },
            parse: (data) => {
                return data;
            },
        },

    ]);

export default SigninStore;
