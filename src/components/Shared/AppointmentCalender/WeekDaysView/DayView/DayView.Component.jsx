import React, { useEffect, useState } from 'react'
import './DayView.Component.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  appointmentAvailableTimeSlots,
  primaryAppointmentDate,
  secondaryAppointmentDate,
} from '../../../../../redux/actions/commonActions' //'../../../redux/actions/commonActions'

const DayViewComponent = props => {
  const { day, dayDesc, availableTimeSlots } = props.avaliableAppointmentDay
  var rweekDaysAvailablities = useSelector(state => state.appointmentAvailableTimeSlots)
  const [availableTimes, setAvailableTimes] = useState(availableTimeSlots)
  const primaryDate = useSelector(state => state.primaryAppointmentDate)
  const secondaryDate = useSelector(state => state.secondaryAppointmentDate)
  const dispatch = useDispatch()
  const [daySelected, setDaySelected] = useState({})
  console.log('availableTimeSlots 1213', day, availableTimeSlots)

  useEffect(() => {
    setAvailableTimes(availableTimeSlots)
  }, [day])

  const handleSelectedTime = (newDay, id) => {
    var newWeekDaysAvailablities = []
    var isUnselected = false
    // console.log('rweekDaysAvailablities', rweekDaysAvailablities)
    const selectedDay = rweekDaysAvailablities.filter(ad => ad.day === newDay)
    console.log('selectedDay 11', selectedDay)

    var selectedTimeSlot = {}
    if (selectedDay.length > 0) {
      const newSelectedDay = selectedDay[0]
      console.log('selectedDay', newSelectedDay)

      const ats = newSelectedDay.availableTimeSlots
      var newATS = []
      ats.map(a => {
        if (a.availabilityId === id) {
          selectedTimeSlot = a
          const aSelected = a.isSelected
          isUnselected = !aSelected
          if (primaryDate.Day === null) {
            const availableTS = { ...a, isSelected: isUnselected, isPrimary: isUnselected, isSecondary: false }
            newATS.push(availableTS)
          } else if (secondaryDate.Day === null) {
            const availableTS = { ...a, isSelected: isUnselected, isPrimary: false, isSecondary: isUnselected }
            newATS.push(availableTS)
          } else {
            const availableTS = { ...a, isSelected: isUnselected, isPrimary: false, isSecondary: false }
            newATS.push(availableTS)
          }

          // console.log('selected time', availableTS)
        } else newATS.push(a)
      })
      const newSelectedTimeSlot = { ...newSelectedDay, availableTimeSlots: newATS }
      console.log('newSelectedTimeSlot', newSelectedTimeSlot)
      rweekDaysAvailablities.map(wda => {
        if (wda.day === newDay) newWeekDaysAvailablities.push(newSelectedTimeSlot)
        else newWeekDaysAvailablities.push(wda)
      })
      setAvailableTimes(newATS)
    }

    var selectedDate = {
      Day: newDay,
      timings: {
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        timeSlotId: id,
      },
    }
    const tSelectedDate = selectedDate
    if (!isUnselected) {
      selectedDate = {
        Day: null,
        timings: {
          startTime: null,
          endTime: null,
          timeSlotId: null,
        },
      }
    }

    console.log('newDay', newDay)
    console.log('selectedDate 1', selectedDate)
    console.log('selectedDate 1>> primary', primaryDate)
    console.log('selectedDate 1>> secondary', secondaryDate)

    setDaySelected(selectedDate)

    //if (primaryDate.Day === null || primaryDate.Day === selectedDate.Day || primaryDate.Day === newDay) {
    if (
      (primaryDate.Day === null && secondaryDate.Day === null) ||
      (primaryDate.Day === tSelectedDate.Day && primaryDate.timings.startTime === tSelectedDate.timings.startTime)
    ) {
      console.log('cond >> selectedDate 1', selectedDate)
      dispatch(primaryAppointmentDate(selectedDate))
    } else if (
      (primaryDate.Day != null && secondaryDate.Day === null) ||
      (secondaryDate.Day === tSelectedDate.Day && secondaryDate.timings.startTime === tSelectedDate.timings.startTime)
    ) {
      console.log('cond >> selectedDate 2', selectedDate)
      dispatch(secondaryAppointmentDate(selectedDate))
    } else if (primaryDate.Day === null && secondaryDate.Day != null) {
      console.log('cond >> selectedDate 2', selectedDate)
      dispatch(primaryAppointmentDate(selectedDate))
    } else if (primaryDate.Day != null && secondaryDate.Day === null) {
      console.log('cond >> selectedDate 2', selectedDate)
      dispatch(secondaryAppointmentDate(selectedDate))
    } else if (primaryDate.Day === null && secondaryDate.Day === null) {
      console.log('cond >> selectedDate 2', selectedDate)
      dispatch(primaryAppointmentDate(selectedDate))
    }
    // console.log('conditions 1 >> ',
    // newDay ,primaryDate.Day,
    // primaryDate.timings.timeSlotId)

    // console.log('conditions 2 >> ',
    // newDay,secondaryDate.Day ,
    // secondaryDate.timings.timeSlotId)

    // console.log('conditions 3 >> ', primaryDate.timings.timeSlotId , secondaryDate.timings.timeSlotId )

    //if(dispatch(secondaryAppointmentDate(selectedDate))
    console.log('newWeekDaysAvailablities', newWeekDaysAvailablities)
    // if(primaryDate.Day === null || secondaryDate.Day === null)
    dispatch(appointmentAvailableTimeSlots(newWeekDaysAvailablities))
  }

  return (
    <div className="dv__main__div">
      <div className="dv__row">
        <div className="dv__day__desc">{dayDesc}</div>
      </div>
      <hr className="dv__hr__section" />
      <div className="dv__ats">
        {availableTimes &&
          availableTimes.map(ats => (
            <div className="dv__row">
              {ats.isEnabled && ats.isPrimary ? (
                <div
                  className="dv__time__text__selected"
                  key={ats.availabilityId}
                  onClick={() => handleSelectedTime(day, ats.availabilityId)}
                >
                  {ats.isSelected ? <div className="dv__primary__text dv__selected__primary">Primary</div> : null}
                  <div className="dv__primary__text">
                    {ats.startTime} - {ats.endTime}
                  </div>
                </div>
              ) : null}
              {ats.isEnabled && ats.isSecondary ? (
                <div
                  className="dv__secondary__time__text__selected"
                  key={ats.availabilityId}
                  onClick={() => handleSelectedTime(day, ats.availabilityId)}
                >
                  {ats.isSelected ? <div className="dv__primary__text dv__selected__primary">Secondary</div> : null}
                  <div className="dv__primary__text">
                    {ats.startTime} - {ats.endTime}
                  </div>
                </div>
              ) : null}
              {ats.isEnabled && !ats.isPrimary && !ats.isSecondary ? (
                <div
                  className="dv__time__text"
                  key={ats.availabilityId}
                  onClick={() => handleSelectedTime(day, ats.availabilityId)}
                >
                  <div className="dv__primary__text">
                    {ats.startTime} - {ats.endTime}
                  </div>
                </div>
              ) : null}

              {!ats.isEnabled ? (
                <div className="dv__time__disabled">
                  {ats.startTime} - {ats.endTime}
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  )
}

export default DayViewComponent
