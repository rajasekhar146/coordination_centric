import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'
import { authenticationService } from '../services'
import history from '../history'
import moment from 'moment'

const apiURL = 'https://api.csuite.health'

const axiosConfig = {
    headers: authHeader(),
}

export const memberService = {
    inviteMember,
    uploadCertificate
}


function inviteMember(data) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .post(`${apiURL}/facilityList/inviteMember`, data, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}

function uploadCertificate(formData, role, onUploadProgress) {
    let axiosConfig = {
        headers: authHeader(),
        onUploadProgress: onUploadProgress
    }
    return (
        axios
            .post(`${apiURL}/files/uploadCertificate/${role}`, formData, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}


// function uploadMemberPic(role, file, source) {
//     const bodyMsg = {
//         image: file
//     }
//     var formdata = new FormData();
//     //formdata.append("image", fileInput.files[0], "/C:/Users/LENOVO/Pictures/Screenshots/Screenshot (6).png");
//     formdata.append("image", file, source);

//     var requestOptions = {
//         method: 'POST',
//         body: formdata,
//         redirect: 'follow'
//     };

//     fetch("https://api.csuite.health/files/uploadCertificate/doctor", requestOptions)
//         .then(response => response.text())
//         .then(result => console.log('doctor', JSON.parse(result)))
//         .catch(error => console.log('error', error))
// }
