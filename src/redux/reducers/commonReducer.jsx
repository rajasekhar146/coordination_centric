import { ActionTypes } from '../constants/action-types'
import moment from 'moment'
import get from 'lodash.get';

const initialState = {
  countries: [],
}

const specialtiesInitialState = {
  specialties: [],
}

const quickProfileSetupInitialState = {
  activeStep: 0,
}

const appointmentDateInitialState = {
  calenderDate: {
    Year: moment().format('YYYY'),
    Month: moment().format('MM'),
    Day: moment().format('DD'),
  },
}

const primaryppointments = {
  Day: null,
  Time: {
    startTime: null,
    endTime: null
  }
}

const secondaryAppointment = {
  Day: null,
  Time: {
    startTime: null,
    endTime: null
  }
}

const flagMsg = {
  openFlash: false,
  alertMsg: '',
  subLabel: ''
}

const weekDays = [0, 1, 2, 3, 4, 5]


// const availablities = [
//   { availabilityId: 1, availableTimeSlot: '08:00am - 09:00am', isSelected: false, isEnabled: true },
//   { availabilityId: 2, availableTimeSlot: '09:00am - 10:00am', isSelected: false, isEnabled: true },
//   { availabilityId: 3, availableTimeSlot: '10:00am - 11:00am', isSelected: false, isEnabled: false },
//   { availabilityId: 4, availableTimeSlot: '11:00am - 12:00pm', isSelected: false, isEnabled: true },
//   { availabilityId: 5, availableTimeSlot: '12:00pm - 01:00pm', isSelected: false, isEnabled: true },
//   { availabilityId: 6, availableTimeSlot: '01:00pm - 02:00pm', isSelected: false, isEnabled: true },
//   { availabilityId: 7, availableTimeSlot: '02:00pm - 03:00pm', isSelected: false, isEnabled: true },
//   { availabilityId: 8, availableTimeSlot: '03:00pm - 04:00pm', isSelected: false, isEnabled: true },
//   { availabilityId: 9, availableTimeSlot: '04:00pm - 05:00pm', isSelected: false, isEnabled: true },
//   { availabilityId: 11, availableTimeSlot: '05:00pm - 06:00pm', isSelected: false, isEnabled: true },
//   { availabilityId: 12, availableTimeSlot: '06:00pm - 07:00pm', isSelected: false, isEnabled: true },
//   { availabilityId: 13, availableTimeSlot: '07:00pm - 08:00pm', isSelected: false, isEnabled: true },
//   { availabilityId: 14, availableTimeSlot: '08:00pm - 09:00pm', isSelected: false, isEnabled: true },
//   { availabilityId: 15, availableTimeSlot: '09:00pm - 10:00pm', isSelected: false, isEnabled: true },
// ]

const getWeekDays = (data, selectedDate) => {
  var weekDaysAvailablities = []
  const availabilities = get(data, ['availabilities', '0', 'days'], []);
  const appointments = get(data, ['appointments'], []);
  weekDays.forEach(d => {
    const currentDate = moment(selectedDate).add(d, 'd')
    console.log('day', currentDate.format('dddd, DD'), d)
    const dayValue = currentDate.format('dddd, DD').split(",", 2)
    const availabilityDayDetail = {
      dayDesc: currentDate.format('dddd, DD'),
      availableTimeSlots: getAvailabilites(availabilities, dayValue[0], appointments, currentDate),
      day: currentDate.format('YYYY-MM-DD'),
    }
    weekDaysAvailablities.push(availabilityDayDetail)
  })
  console.log('data123', weekDaysAvailablities)
  return weekDaysAvailablities
}

const createTimeSlot = (item, appointments, date) => {
  const slotInterval = 30;
  const allTimes = []
  let startTime = moment(new Date(item.first_half_starting_time), "HH:mm")
  let endTime = moment(new Date(item.first_half_ending_time), "HH:mm");
  let secondHalffStartTime = moment(new Date(item.second_half_starting_time), "HH:mm")
  let secondHalfEndTime = moment(new Date(item.second_half_ending_time), "HH:mm");
  const currentTimeStamp = moment(new Date()).format('YYYY-MM-DD');
  const slotStartingDay = moment(date).format('YYYY-MM-DD');
  const startingTime = moment(new Date(startTime), "HH:mm").format("HH:mm")
  const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const startingDate = moment(currentTimeStamp + ' ' + startingTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss')

  let availabilityId = 1

  while (startTime < endTime) {
    let disableIndex;
    disableIndex = appointments.findIndex(i => {
      return moment(new Date(i.startTime), "HH:mm").format("HH:mm") === moment(new Date(item.first_half_starting_time), "HH:mm").format("HH:mm")
    })
    if (slotStartingDay === currentTimeStamp) {
      if (moment(new Date(startTime), "HH:mm").format("HH:mm") < moment(new Date(), "HH:mm").format("HH:mm")) {
        disableIndex = null
      }
    }
    //Push times
    allTimes.push({
      availabilityId,
      availableTimeSlots: {
        startTime: moment(new Date(startTime), "HH:mm").format("HH:mm"),
        endTime: moment(new Date(startTime.add(slotInterval, 'minutes')), "HH:mm").format("HH:mm")
      },
      isSelected: false,
      isEnabled: disableIndex ? true : false
    });
    //Add interval of 30 minutes
    // startTime.add(slotInterval, 'minutes');
    availabilityId += 1
  }

  while (secondHalffStartTime < secondHalfEndTime) {
    const disableIndex = appointments.findIndex(i => {
      return moment(new Date(i.startTime), "HH:mm").format("HH:mm") === moment(new Date(item.second_half_starting_time), "HH:mm").format("HH:mm")

    })
    //Push times
    allTimes.push({
      availabilityId,
      availableTimeSlots: {
        startTime: moment(new Date(secondHalffStartTime), "HH:mm").format("HH:mm"),
        endTime: moment(new Date(secondHalffStartTime.add(slotInterval, 'minutes')), "HH:mm").format("HH:mm")
      },
      isSelected: false,
      isEnabled: disableIndex ? true : false
    });
    //Add interval of 30 minutes
    // startTime.add(slotInterval, 'minutes');
    availabilityId += 1
  }
  return allTimes;
}

const getAvailabilites = (data, day, appointments, date) => {
  let availablities = [];
  const filteredArray = data.filter((val) => val.day === day)
  if (filteredArray.length) {
    availablities = createTimeSlot(get(filteredArray, ['0'], {}), appointments, date)
  }

  return availablities;
}

// const availablities = [
//   { availabilityId: 2, availableTimeSlot: '09:00am - 10:00am', isSelected: false },
//   { availabilityId: 3, availableTimeSlot: '10:00am - 11:00am', isSelected: false },
//   { availabilityId: 4, availableTimeSlot: '11:00am - 12:00pm', isSelected: false },
//   { availabilityId: 5, availableTimeSlot: '12:00pm - 01:00pm', isSelected: false },
//   { availabilityId: 6, availableTimeSlot: '01:00pm - 02:00pm', isSelected: false },
//   { availabilityId: 7, availableTimeSlot: '02:00pm - 03:00pm', isSelected: false },
//   { availabilityId: 8, availableTimeSlot: '03:00pm - 04:00pm', isSelected: false },
//   { availabilityId: 9, availableTimeSlot: '04:00pm - 05:00pm', isSelected: false },
//   { availabilityId: 11, availableTimeSlot: '05:00pm - 06:00pm', isSelected: false },
//   { availabilityId: 12, availableTimeSlot: '06:00pm - 07:00pm', isSelected: false },
//   { availabilityId: 13, availableTimeSlot: '07:00pm - 08:00pm', isSelected: false },
//   { availabilityId: 14, availableTimeSlot: '08:00pm - 09:00pm', isSelected: false },
//   { availabilityId: 15, availableTimeSlot: '09:00pm - 10:00pm', isSelected: false },
// ]

const availableTimeSlotsInitialState = {
  calenderDate: {
    Year: moment().format('YYYY'),
    Month: moment().format('MM'),
    Day: moment().format('DD'),
  },
}


export const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_COUNTRIES:
      return { ...state, countries: payload }
    case ActionTypes.SET_HEALTH_PROBLEMS:
      return { ...state, healthProblems: payload }
    default:
      return state
  }
}

export const specialtiesReducer = (state = specialtiesInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_SPECIALTIES:
      return { ...state, specialties: payload }
    default:
      return state
  }
}

export const setCompleteProfileReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionTypes.COMPLETE_PROFILE_POPUP:
      return payload
    default:
      return state
  }
}

export const setQuickProfileSetupReducer = (state = quickProfileSetupInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.QUICK_PROFILE_SETUP_STEP:
      return payload
    default:
      return state
  }
}

export const setCalendarAppointmentDateReducer = (state = appointmentDateInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CALENDAR_APPOINTMENT_DATE:
      return { ...state, calenderDate: payload }
    default:
      return state
  }
}

export const setAppointmentAvailableTimeSlotsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.APPOINTMENT_AVAILABLE_TIME_SLOTS:
      if (payload.selectedTime) {
        return payload.availableTimeSlots;
      } else {
        const availablities = getWeekDays(payload.availableTimeSlots, payload.selectedDate)
        return availablities;
      }

    default:
      return state
  }
}

export const setPrimaryAppointmentDateReducer = (state = primaryppointments, { type, payload }) => {
  switch (type) {
    case ActionTypes.APPOINTMENT_PRIMARY_DATE:
      return payload
    default:
      return state
  }
}

export const setSecondaryAppointmentDateReducer = (state = secondaryAppointment, { type, payload }) => {
  switch (type) {
    case ActionTypes.APPOINTMENT_SECONDARY_DATE:
      return payload
    default:
      return state
  }
}


export const setFlashMsgReducer = (state = flagMsg, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FLAG_MESSAGE:
      return payload
    default:
      return state
  }
}
