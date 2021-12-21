import axios from "axios";
import * as env from '../../../../../environments/environment';
import { authHeader } from '../../../../../helpers';
const apiURL = env.environment.apiBaseUrl;
const axiosConfig = {
  headers: authHeader(),
}

export const ExtendWidService = (postData)=>{
    return axios.put(`${apiURL}/video/extendmeeting`,postData,axiosConfig)
} 