import React, { useState } from 'react'
import Button from '@mui/material/Button'
import history from '../../history';
import TextField from '@mui/material/TextField'
import ReScheduleIcon from '../../assets/icons/reject_org.png'


const CancelAppointmentReasonPopup = props=> {

    const {
        clickCloseButton,
        submitCancelReason,
        cancelReasonInput,
        setcancelReasonInput,
        cancelReasonInputErr,
    } = props

    const cancelReasonHanlde = (event) =>{
        setcancelReasonInput(event.target.value)
    }
    return (
        <div className="gn__main__div">
          <div className="io__row io__icon">
                <img src={ReScheduleIcon} alt="Approve Org" />
            </div>
        <div className="gn__row text-center">
          <div className="gn__title">Cancel Appointment</div>
        </div>
  
        <div className="gn__row text-center">
          <div className=" gn__sub__title">
          Are you sure you want to cancel this appointment?
        </div>
        </div>
        <div className="">
      <div className="pas__problem__label mar-top-1rem">Reason*:</div>

      <div className="pas__row pas__height">

        <div className="pas__problem__txtbox__section">
          <TextField
            margin="normal"
            placeholder="e.g. Reason"
            inputProps={{ className: 'pas__problem__textbox' }}
            defaultValue={cancelReasonInput}
            onChange={cancelReasonHanlde}
          />
        </div>
    
      </div>
      <div className="pas__row">
        {
        cancelReasonInputErr && <span className="reason_error">
          Reason is required
        </span>
      }
      </div>
          <div style={{ marginTop: '20px' }} className="gn__same__line">
            <div className=" btn_grid">
              <Button className="capitalize" onClick={clickCloseButton}>
                Back
              </Button>
              <Button type="submit" onClick={submitCancelReason} className="cancel__btn">
                Cancel Appointment 
              </Button>
            </div>
          </div>
        </div>
      
      </div>
    )

}

export default CancelAppointmentReasonPopup;