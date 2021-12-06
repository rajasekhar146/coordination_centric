import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calendarAppointmentDate, appointmentAvailableTimeSlots } from '../../../../redux/actions/commonActions' //'../../../redux/actions/commonActions'
import moment from 'moment'
import DayViewComponent from './DayView/DayView.Component'
import './WeekDaysView.Component.css'
import RoundedBackArrow from '../../../../assets/icons/round_back_arrow.png'
import RoundedNextArrow from '../../../../assets/icons/round_next_arrow.png'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import PatientConfimationAppointmentComponent from '../../../ModelPopup/PatientConfimationAppointment.Component'
import ProblemAndSymptomsComponent from '../../../ModelPopup/ProblemAndSymptoms.Component'
import AppointmentApproveRequest from '../../../ModelPopup/AppointmentApproveRequest'
import get from 'lodash.get'
import { authenticationService, appointmentService } from '../../../../services'
import {
  setFlashMsg,
  primaryAppointmentDate,
  secondaryAppointmentDate,
  // getWeekDays
} from '../../../../redux/actions/commonActions'
import { useHistory } from 'react-router-dom'
import { getWeekDays } from '../../../../stores/appointmentslotstore'
import AppointmentSlotsStore from '../../../../stores/appointmentslotstore'
import useStore from '../../../../hooks/use-store';


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
const confirmPopupWithoutSecondary = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 2,
}

const problemAndSymptoms = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 2,
}

const availablities = [
  { availabilityId: 1, availableTimeSlot: '08:00am - 09:00am', isSelected: false, isEnabled: true },
  { availabilityId: 2, availableTimeSlot: '09:00am - 10:00am', isSelected: false, isEnabled: true },
  { availabilityId: 3, availableTimeSlot: '10:00am - 11:00am', isSelected: false, isEnabled: false },
  { availabilityId: 4, availableTimeSlot: '11:00am - 12:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 5, availableTimeSlot: '12:00pm - 01:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 6, availableTimeSlot: '01:00pm - 02:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 7, availableTimeSlot: '02:00pm - 03:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 8, availableTimeSlot: '03:00pm - 04:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 9, availableTimeSlot: '04:00pm - 05:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 11, availableTimeSlot: '05:00pm - 06:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 12, availableTimeSlot: '06:00pm - 07:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 13, availableTimeSlot: '07:00pm - 08:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 14, availableTimeSlot: '08:00pm - 09:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 15, availableTimeSlot: '09:00pm - 10:00pm', isSelected: false, isEnabled: true },
]



const weekDays = [0, 1, 2, 3, 4, 5]

const WeekDaysViewComponent = (props) => {
  const {
    appointmentDetails,
    type
  } = props;
  const history = useHistory()
  const currentUser = authenticationService.currentUserValue
  const role = get(currentUser, ['data', 'data', 'role'], '')


  const getUserId = (role) => {
    switch (role) {
      case 'doctor':
        return get(currentUser, ['data', 'data', '_id'], '')
      default:
        return appointmentDetails._id
    }
  }

  const userId = getUserId(role)


  const appointmentUserId = props.id;
  // const doctorName = props.name;
  const [days, setDays] = useState([])
  const selectedCalender = useSelector(state => state.calendarAppointmentDate)
  const rweekDaysAvailablities = useSelector(state => state.appointmentAvailableTimeSlots)


  const [appointmentSlotsData] = useStore(AppointmentSlotsStore);

  const {
    appointmentSlots,
  } = appointmentSlotsData;




  const [avaliableAppointmentDays, setAvaliableAppointmentDays] = useState([])
  const [currentDay, setCurrentDay] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [IsClickedAppointment, setClickedAppointment] = useState(false)
  const dispatch = useDispatch()
  console.log('rweekDaysAvailablities', rweekDaysAvailablities)
  const primaryDate = useSelector(state => state.primaryAppointmentDate)
  const secondaryDate = useSelector(state => state.secondaryAppointmentDate)
  const [IsClickedConfirm, setClickedConfirm] = useState(false)
  const [IsClickedSubmit, setClickedSubmit] = useState(false)
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [selectedDay, setSelectedday] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [invitedMembers, setInvitedMembers] = useState([{
    email: '',
  }]);

  const [appointmentReason, setAppointmentReason] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [appointmentReasonErr, setappointmentReasonErr] = useState(false);
  const [reportsArray, setReportsArray] = useState([]);


  const getAwailablities = async (selectedDate) => {
    const startDate = moment(new Date()).format("YYYY-MM-DD");
    const endDate = moment(new Date()).add(5, 'days').format("YYYY-MM-DD");

    const res = await appointmentService.getAppointmentsForAwailability(userId, startDate, endDate)
    if (res.status === 200) {
      // console.log('data123', get(res, ['data', 'data'], null), selectedDate)
      // getWeekDays(get(res, ['data', 'data'], null), selectedDate)
      console.log()
      dispatch(appointmentAvailableTimeSlots(get(res, ['data', 'data'], null), selectedDate))
    } else {

    }
  }

  useEffect(() => {
    setSelectedYear(selectedCalender.calenderDate.Year)
    setSelectedMonth(selectedCalender.calenderDate.Month)
    setSelectedday(selectedCalender.calenderDate.Day)
    setSelectedDate(getSelectedDate(selectedYear, selectedMonth, selectedDay))
  }, [selectedCalender])
  console.log('moment date', selectedDay)
  // moment(selectedDate).add(d, 'd')


  useEffect(async () => {
    if (selectedDate) {
      getAwailablities(selectedDate)
      console.log('selectedYear', selectedYear, 'selectedMonth', selectedMonth, 'selectedDay', selectedDay)
      console.log('useEffect Week Days >> selectedDate ', selectedDate.format('dddd, DD'))
    }
    //const day = selectedYear + '-' + selectedMonth + '-' + selectedDay
    // await getWeekDays(selectedDate)

  }, [moment(selectedDate).format('YYYY-MM-DD')])

  useEffect(() => {
    setAvaliableAppointmentDays([...rweekDaysAvailablities])
    return () => {
      dispatch(primaryAppointmentDate({
        Day: null,
        Time: {
          startTime: null,
          endTime: null
        }
      }))
      dispatch(secondaryAppointmentDate({
        Day: null,
        Time: {
          startTime: null,
          endTime: null
        }
      }))
    }
  }, [rweekDaysAvailablities.length])

  const getSelectedDate = (year, month, day) => {
    // const selectedDay = year + '-' + month + '-' + day
    return moment(new Date())
  }
  const getWeekDays = async selectedDay => {
    var weekDaysAvailablities = []
    weekDays.forEach(d => {
      const currentDate = moment(selectedDay).add(d, 'd')
      console.log('day', currentDate.format('dddd, DD'), d)
      const availabilityDayDetail = {
        dayDesc: currentDate.format('dddd, DD'),
        availableTimeSlots: availablities,
        day: currentDate.format('YYYY-MM-DD'),
      }
      weekDaysAvailablities.push(availabilityDayDetail)
    })
    setAvaliableAppointmentDays(weekDaysAvailablities)
    console.log('weekDaysAvailablities', weekDaysAvailablities)
    // dispatch(appointmentAvailableTimeSlots(weekDaysAvailablities))
  }

  const moveBack = async () => {
    // console.log('useEffect Week Days', selectedCalender)
    // const selectedYear = selectedCalender.calenderDate.Year
    // const selectedMonth = selectedCalender.calenderDate.Month
    // const selectedDay = selectedCalender.calenderDate.Day
    // const selectedDate = await getSelectedDate(selectedYear, selectedMonth, selectedDay)

    // const newSelectedDate = moment(selectedDate).add(-5, 'd')
    // const newDay = newSelectedDate.format('MMMM, YYYY')
    // console.log(newSelectedDate.format('dddd, DD'))
    // setCurrentDate(newDay)
    // setCurrentDay(newSelectedDate)
    // const calenderDay = {
    //   Year: newSelectedDate.format('YYYY'),
    //   Month: newSelectedDate.format('MM'),
    //   Day: newSelectedDate.format('DD'),
    // }
    // dispatch(calendarAppointmentDate(calenderDay))
    setSelectedday(moment().add(-1, 'days').format('DD'))
  }
  const moveNext = async () => {
    // console.log('useEffect Week Days', selectedCalender)
    // const selectedYear = selectedCalender.calenderDate.Year
    // const selectedMonth = selectedCalender.calenderDate.Month
    // const selectedDay = selectedCalender.calenderDate.Day
    // const selectedDate = await getSelectedDate(selectedYear, selectedMonth, selectedDay)

    // const newSelectedDate = moment(selectedDate).add(5, 'd')
    // const newDay = newSelectedDate.format('MMMM, YYYY')
    // console.log(newSelectedDate.format('dddd, DD'))
    // setCurrentDate(newDay)
    // setCurrentDay(newSelectedDate)
    // const calenderDay = {
    //   Year: newSelectedDate.format('YYYY'),
    //   Month: newSelectedDate.format('MM'),
    //   Day: newSelectedDate.format('DD'),
    // }
    // dispatch(calendarAppointmentDate(calenderDay))
    setSelectedDate(moment(selectedDate).add(1, 'd'))
    // getSelectedDate

  }

  const clickCloseButton = () => {
    setClickedAppointment(false)
  }

  const clickConfirmButton = async () => {

    if (role === "patient" && type !== 'rescheduleByPatient') {
      setClickedAppointment(false)
      setClickedConfirm(true)
      return false;
    }
    const reqData = {};
    reqData.primaryStartTime = moment(primaryDate.Day + ' ' + primaryDate.Time.startTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');
    reqData.primaryEndTime = moment(primaryDate.Day + ' ' + primaryDate.Time.endTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');
    if (secondaryDate.Day && secondaryDate.Time.startTime) {
      reqData.secondaryStartTime = moment(secondaryDate.Day + ' ' + secondaryDate.Time.startTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');
      reqData.secondaryEndTime = moment(secondaryDate.Day + ' ' + secondaryDate.Time.endTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');
    }
    reqData.appointmentReason = appointmentReason
    reqData.email = invitedMembers.map(x => x.email);
    reqData.documents = selectedFiles.map(x => x.path)

    if (role === 'doctor') {
      reqData.patientId = appointmentDetails._id
      reqData.doctorId = userId
    } else if (role === 'patient') {
      reqData.doctorId = appointmentDetails._id
    }
    let res;
    if ((role === 'doctor' || type === 'rescheduleByPatient')) {
      res = await appointmentService.rescheduleAppointment(reqData, appointmentDetails.appointmentid, type)
    } else {
      res = await appointmentService.makeAppointment(reqData)
    }
    if (res.status === 200) {
      dispatch(setFlashMsg({
        openFlash: true,
        alertMsg: 'Well done!',
        subLabel: 'Your appointment was successfuly re-scheduled, wait 24h for doctor confirmation.'
      }))
      history.push('/appointments')
      setClickedConfirm(false)
      setClickedSubmit(true)
    } else {
      console.log("Makeappointment", res.error);
    }
    setClickedAppointment(false)

  }

  const clickBackButton = () => {
    setClickedAppointment(true)
    setClickedConfirm(false)
  }

  const clickSubmitButton = () => {
    if (appointmentReason == '') {
      setappointmentReasonErr(true);
      return false;
    }
    let result, isEmailError = 0;
    invitedMembers.map(inputsField => {
      result = inputsField.validator;
      if (result == false) {
        isEmailError++;
      }
    })

    if (isEmailError > 0) {
      return false;
    }

    const reqData = {};
    reqData.primaryStartTime = moment(primaryDate.Day + ' ' + primaryDate.Time.startTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');
    reqData.primaryEndTime = moment(primaryDate.Day + ' ' + primaryDate.Time.endTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');
    if (secondaryDate.Day && secondaryDate.Time.startTime) {
      reqData.secondaryStartTime = moment(secondaryDate.Day + ' ' + secondaryDate.Time.startTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');
      reqData.secondaryEndTime = moment(secondaryDate.Day + ' ' + secondaryDate.Time.endTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');
    }
    reqData.appointmentReason = appointmentReason
    reqData.email = invitedMembers.map(x => x.email);
    reqData.documents = reportsArray.map(x => x)


    if (role === 'doctor') {
      reqData.patientId = appointmentDetails.id
    } else if (role === 'patient') {
      reqData.doctorId = appointmentDetails._id
    }
    console.log("appointmentRequest", reqData);

    appointmentService.makeAppointment(reqData).then(
      res => {
        console.log("makeAppointment", res);
        setClickedConfirm(false)
        setClickedSubmit(true)
      }, error => {
        console.log("Makeappointment", error);
      })
  }

  const clickRequestClose = () => {
    setClickedSubmit(false)
    history.push('/appointments')
  }

  return (
    <div className="wdv__main__div">
      <div className="wdv__row">
        {' '}
        <img src={RoundedBackArrow} alt="back" style={{ cursor: 'pointer' }} onClick={() => moveBack()} />
        {avaliableAppointmentDays &&
          avaliableAppointmentDays.map(aas => (
            <div className="wdv__column">
              <DayViewComponent
                avaliableAppointmentDay={aas}
                avaliableAppointmentDays={avaliableAppointmentDays}
                setAvaliableAppointmentDays={setAvaliableAppointmentDays}
              />
            </div>
          ))}
        <img src={RoundedNextArrow} alt="next" style={{ cursor: 'pointer' }} onClick={() => moveNext()} />
      </div>
      <div className="wdv__row">
        <div className="wdv__section">
          {primaryDate.Day === null ? (
            <Button className="wdv__next__btn">Next</Button>
          ) : (
            <Button className="wdv__request__appointment" onClick={() => setClickedAppointment(true)}>
              Request Appointment
            </Button>
          )}
        </div>
      </div>

      <Modal open={IsClickedAppointment} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={secondaryDate.Day === null ? confirmPopupWithoutSecondary : confirmAppointment}>
          <PatientConfimationAppointmentComponent
            appointmentDetails={appointmentDetails}
            id={appointmentUserId}
            role={role}
            clickCloseButton={clickCloseButton}
            clickConfirmButton={clickConfirmButton}

          />
        </Box>
      </Modal>
      <Modal open={IsClickedConfirm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={problemAndSymptoms}>
          <ProblemAndSymptomsComponent
            clickBackButton={clickBackButton}
            clickSubmitButton={clickSubmitButton}
            invitedMembers={invitedMembers}
            setInvitedMembers={setInvitedMembers}
            appointmentReason={appointmentReason}
            setAppointmentReason={setAppointmentReason}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            appointmentReasonErr={appointmentReasonErr}
            setappointmentReasonErr={setappointmentReasonErr}
            reportsArray = {reportsArray}
            setReportsArray = {setReportsArray}
          />
        </Box>
      </Modal>

      <Modal open={IsClickedSubmit} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={problemAndSymptoms}>
          <AppointmentApproveRequest clickRequestClose={clickRequestClose} />
        </Box>
      </Modal>
    </div>
  )
}

export default WeekDaysViewComponent
