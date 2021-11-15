import React, { useEffect, useState } from 'react'
import { memberService } from '../../services'
import UploadFileIcon from '../../assets/icons/uploadfile.png'
import LinearProgress from '@mui/material/LinearProgress';
import UploadSuccess from '../../assets/icons/upload_success.png'
import DeleteIcon from '../../assets/icons/delete_icon.png'



const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // eslint-disable-next-line no-restricted-properties
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};




const UploadFile = (props) => {
    const {
        file
    } = props;
    const [imgUrl, setImgUrl] = useState('')
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const [fileSize, setFileSize] = useState(0);

    useEffect(() => {
        const formData = new FormData()
        formData.append(`image`, file)
        const reader = new FileReader();
        reader.onload = () => {
            setFileSize(formatBytes(file.size))
            setImgUrl(URL.createObjectURL(file))
        }
        reader.readAsArrayBuffer(file)
        memberService.uploadCertificate(formData, 'doctor', (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        }).then((response) => {
            setMessage(response.data.message);
        }).catch(() => {

        })
    }, [])



    return (
        <div className="od_dropzone_progress mb_25">
            <div className="">
                <span className="io_delete">
                    {progress === 100
                        ? <img className="upload_icon" src={UploadSuccess} alt="upload" />
                        : <img className="upload_icon" src={DeleteIcon} alt="upload" />
                    }
                </span>
                <img className="upload_icon" src={UploadFileIcon} alt="upload" />
                <div className="io_filename">
                    <label >{file.name}</label>
                </div >
                <div className="io_filesize">
                    <label >{fileSize}</label>
                </div>
                <div className="io_progressbar">
                    <LinearProgress variant="determinate" value={progress} />

                </div>
                <label className="io_p_value">{progress}%</label>

            </div>
        </div>
    );
}
export default UploadFile
