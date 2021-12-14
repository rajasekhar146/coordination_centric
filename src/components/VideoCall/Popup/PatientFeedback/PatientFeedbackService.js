import axios from "axios";
import * as env from '../../../../environments/environment';
import { authHeader } from '../../../../helpers';
const apiURL = env.environment.apiBaseUrl;
const axiosConfig = {
  headers: authHeader(),
}

export const PatientFeedbackService = (postData)=>{
                return axios.post(`${apiURL}/doctorReviews/addReview`,postData,axiosConfig)
} 