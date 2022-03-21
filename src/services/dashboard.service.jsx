import axios from 'axios'
import { BehaviorSubject } from 'rxjs'
import get from 'lodash.get'
import * as env from '../environments/environment'
// import config from 'config';
import { authHeader } from '../helpers'
const apiURL = env.environment.apiBaseUrl

export const dashboardService = {
    getDashboardDetails
}

function getDashboardDetails(role) {
    let axiosConfig = {
        headers: authHeader(),
    }
    const getUrl = () => {
        switch (role) {
            case 'doctor':
            case 'patient':
                return `${apiURL}/appointment/getDashboardDetails`
                break
            case 'superadmin':
                return `${apiURL}/adminManagement/getDashboardDetailsForSuperAdmin`
                break
            case 'admin':
                return `${apiURL}/adminManagement/getDashboardDetailsForAdmin`
        }
    }
    return (
        axios
            .get(getUrl(), axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}
