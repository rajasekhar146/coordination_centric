import React, { useState, useEffect } from 'react'
import ProblemAndSymptomIcon from '../../assets/icons/problem_symptons.png'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import UploadIcon from '../../assets/icons/upload.png'
import Dropzone from 'react-dropzone'
import UploadFile from '../Settings/UploadFile.Component'
import CloseIcon from '@mui/icons-material/Close';

const ProblemAndSymptomsComponent = (props) => {
  const setInvitedMembers = props.setInvitedMembers;
  const invitedMembers = props.invitedMembers;
  const appointmentReason =props.appointmentReason; 
   const  setAppointmentReason = props.setAppointmentReason;
   const selectedFiles = props.selectedFiles;
   const setSelectedFiles = props.setSelectedFiles;
   const setappointmentReasonErr = props.setappointmentReasonErr;
   const appointmentReasonErr = props.appointmentReasonErr;
  // const [invitedMembers, setInvitedMembers] = useState(0);
  const [inputValues, setInputValues] = useState({});
  const [imgCounter, setImgCounter] = useState(0);
  const [reportsArray, setReportsArray] = useState([]);
  const [showUpload, setshowUpload] = useState(false);


  const handleAddMembers = () => {
    console.log('Clicked')
    var members = [...invitedMembers]
    const newMember = {
      email: '',
      validator : true
    }
    members.push(newMember)
    console.log('members', members)
    setInvitedMembers(members)
  }
  const handleDrop = (files) => {
    files.forEach((file, index) => {
        selectedFiles.push(file)
        setSelectedFiles([...selectedFiles])
    });
}
const handleClose = (e, index) =>{
  var members = [...invitedMembers]
  members.splice(index , 1);
  setInvitedMembers(members)
}

  useEffect(() => {
    var members = {
      email: '',
      validator: true
    }
    setInvitedMembers([members])
  }, [])


  const imgHandleClick = () => {
    setImgCounter(imgCounter + 1);
    setshowUpload(!showUpload)
  };


  const updateInviteEmail = (email,index)=>{
    const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    let emailArray = [...invitedMembers];
    emailArray[index].email = email;
    emailArray[index].validator = emailValidation;
    setInvitedMembers(emailArray);

  }
  const appointmentHanlde = (event)=>{
    if(!event.target.value){
      setappointmentReasonErr(true) 
    }else{
      setappointmentReasonErr(false) 
      setAppointmentReason(event.target.value)
    }
  }

  return (
    <div className="pas__main__div">
      <div className="pas__row">
        <div className="pca__center__align">
          <div>
            <img src={ProblemAndSymptomIcon} alt="Approve Org" />
          </div>
        </div>
      </div>
      <div className="pas__row pas__height">
        <div className="pas__title">What do you feel?</div>
      </div>
      <div className="pas__row pas__height">
        <div className="pas__help__title">Please help us understand why you want to make this appointment.</div>
      </div>
      <div className="pas__row pas__height">
        <div className="pas__problem__label">What’s your medical problem or symptoms?*</div>
      </div>
      <div className="pas__row pas__height">
        <div className="pas__problem__txtbox__section">
          <TextField
            margin="normal"
            placeholder="e.g. Feel pain in my chest"
            inputProps={{ className: 'pas__problem__textbox' }}
            defaultValue= {appointmentReason}
            onChange={appointmentHanlde}
          />
        </div>
      </div>
      {
         appointmentReasonErr && <span className="reason_error">
           Reason is required
         </span>
               }
     
      <div className="pas__row mar-top-30">
        <div className="pas__problem__label">Do you want to invite someone to join the appointment?</div>
      </div>
      <div className="pas__row">
       
      </div>
      <div className="">
      {invitedMembers && invitedMembers.map((c, index) => { return (
        <div className="mar-bot-10 relative">
          {index > 0 && 
           <div className="close_icon">
             <span onClick={ (e)=> handleClose(e,index) }> 
             <CloseIcon className="svg_icons"/>
             </span>
            </div>
      }
        <TextField margin="normal" key={index} value={c.email} inputProps={{ className: 'pas__problem__textbox' }} onChange={(e)=>{updateInviteEmail(e.target.value,index)}}/>

        {!c.validator && 
        <span className="error"> Invalid mail
          </span>}
          
        </div>
        )})}
       <div className="pas__row">
        <div className="pas__invite__button">
      <Button onClick={handleAddMembers}>+ &nbsp;Invite more people</Button>
      </div>
      </div>

    </div>
   <div className="pas__row">
        <div className="pas__problem__label">Supporting Documents</div>
      </div>
      
          <div className="od_input_p">
          {selectedFiles && selectedFiles.map((file , index) => (
              <UploadFile
                  file={file}
                  setReportsArray={setReportsArray}
                  reportsArray={reportsArray}
                  index = {index}
                  setSelectedFiles = {setSelectedFiles}
                  selectedFiles  = {selectedFiles}
              />
          ))
          }
          {showUpload && 
          <div className="od_dropzone_prof mb_25">
              <Dropzone
                  onDrop={handleDrop}
                  accept="image/jpeg, image/png, application/pdf, .pdf, .docx"
                  maxSize={524288000}
              >
                  {({ getRootProps, getInputProps }) => (
                      <section>

                          <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <img className="io_upload_icon" src={UploadIcon} alt="upload" />
                              <p className="io_upload_label">
                                  <span className="io_highlite">Click to upload</span> or drag and drop
                                  <br />
                                  SVG, PNG, JPG or GIF (max. 800x400px)
                              </p>
                          </div>
                      </section>
                  )}
              </Dropzone>
          </div>
          }

    
      </div>
       <div className="pas__row">
        <div className="pas__invite__button">
      <Button onClick={imgHandleClick}>+ &nbsp;Add Supporting Documents (optional)</Button>
      </div>
      </div>

      <div className="pas__row">
        <div className="io__cancel">
          <Button className="io__cancel__btn" onClick={props.clickBackButton}>
            Back
          </Button>
        </div>
        <div className="io__approve">
          <Button className="io__Approve__btn" onClick={props.clickSubmitButton}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProblemAndSymptomsComponent
