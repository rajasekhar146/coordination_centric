import Store from '../libs/store';
import get from 'lodash.get';
import { authHeader, handleResponse } from '../helpers'

const apiURL = 'https://api.csuite.health'



const MemberStore = new Store({

},
    [
        {
            label: 'InviteMember',
            request: {
                // url: `${getEnvValue('API_URL')}/api`,
                url: `${apiURL}/facilityList/inviteMember`,
                method: 'post',
                headers: authHeader(),
            },
            formatter(data, request, config) {
                const output = request;
                output.body = config.requestData;
                return output;
            },
            error: (error) => {
                return get(error, ['body'], null);
            },
            parse: (data) => {
                return data;
            },
        },
        {
            label: 'InviteCollaborator',
            request: {
                // url: `${getEnvValue('API_URL')}/api`,
                url: `${apiURL}/facilityList/inviteMember`,
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

export default MemberStore;
