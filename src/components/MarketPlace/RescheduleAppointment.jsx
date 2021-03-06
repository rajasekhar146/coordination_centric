import React, { useState, useEffect } from 'react'
// import './Appointment.Component.css'
import Button from '@mui/material/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import ConfirmReschedulePopup from '../ModelPopup/ConfirmRescheduleAppointment'
import NavMonthYearComponent from '../Shared/AppointmentCalender/NavMonthYear/NavMonthYear.Component'
import WeekDaysViewComponent from '../Shared/AppointmentCalender/WeekDaysView/WeekDaysView.Component'
import history from '../../history'
import { useDispatch, useSelector } from 'react-redux'
import {
  primaryAppointmentDate,
  secondaryAppointmentDate,
  // getWeekDays
} from '../../redux/actions/commonActions'
const confirmAppointment = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 2,
}

// const confirmAppointment = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 800,
//     bgcolor: 'background.paper',
//     border: '2px solid white',
//     boxShadow: 24,
//     borderRadius: 3,
//     p: 2,
// }

const RescheduleAppointment = () => {
  const appointmentDetails = useSelector(state => state.appointmentDetails)
  const [type, setType] = useState();
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false)
  const [selectedDates, setSelectedDates] = useState([])
  const dispatch = useDispatch()
  const closeApproveModel = () => {
    setIsOpenConfirmPopup(false)
  }

  useEffect(() => {
    const defaultValue = {
      Day: null,
      timings: {
        startTime: null,
        endTime: null,
        timeSlotId: null,
      },
    }
    dispatch(primaryAppointmentDate(defaultValue))
    dispatch(secondaryAppointmentDate(defaultValue))
    if(appointmentDetails.module_slug){
      setType('fromNotification')
    }else{
      setType('rescheduleByPatient')
    }
  }, [])
  return (
    <div className="od__main__div">
      <div className="od__row od_flex_space_between">
        <div className="headerCont">
          <Button
            variant="outlined"
            color="error"
            className="backBtn"
            onClick={() => {
              history.push('/appointments')
            }}
          >
            <ArrowBackIosNewIcon style={{ fontSize: '10', marginRight: '4' }} /> Back
          </Button>
          { appointmentDetails.from && 
        <h5 className="orgTitle">
          {`${appointmentDetails?.gender === 'Male' ? 'Mr.' : 'Ms.'} ${ appointmentDetails.from?.first_name + " " + (appointmentDetails?.from?.last_name)}`}
          </h5> 
          }
          {!appointmentDetails.from && 
          <h5 className="orgTitle">
        {`${appointmentDetails.gender === 'male' ? 'Mr.' : 'Ms.'} ${appointmentDetails.name}`}
          </h5>
          }
        </div>
      </div>
      <div className="od__row">
        <div className="io_select_d_title">
          Re-schedule Request
          <div className="io_p_info_label">Choose another date to request from the available slots.</div>
        </div>
      </div>
      <NavMonthYearComponent />
      <WeekDaysViewComponent appointmentDetails={appointmentDetails} type={type} />
      {/* <div className="io__row">
                <div className="io_next_btn">
                    <div className="io__approve">
                        <Button
                            type="submit"
                            onClick={() => {
                                setIsOpenConfirmPopup(true)
                            }}
                            className="io__Approve__btn">
                            Next
                        </Button>
                    </div>
                </div>
            </div> */}
      <Modal
        open={isOpenConfirmPopup}
        // onClose={setIsAcceptClicked}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={confirmAppointment}>
          <ConfirmReschedulePopup
            clickCloseButton={closeApproveModel}
            // setSkip={setSkip}
            // selectedAppointment={selectedAppointment}
            // setOrganizations={setOrganizations}
            // setOpenFlash={setOpenFlash}
            // setAlertMsg={setAlertMsg}
            // setSubLabel={setSubLabel}
          />
        </Box>
      </Modal>
    </div>
  )
}

export default RescheduleAppointment
