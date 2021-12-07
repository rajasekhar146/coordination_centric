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
          const availableTS = { ...a, isSelected: isUnselected }
          newATS.push(availableTS)
          console.log('selected time', availableTS)
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
    console.log('newDay >> selectedDate', selectedDate)
    setDaySelected(selectedDate)

    //if (primaryDate.Day === null || primaryDate.Day === selectedDate.Day || primaryDate.Day === newDay) {
    if (primaryDate.Day === null || (primaryDate.Day === selectedDate.Day && primaryDate.timings.startTime === selectedDate.timings.startTime ) ) {
      dispatch(primaryAppointmentDate(selectedDate))
    } else if (secondaryDate.Day === null || secondaryDate.Day === selectedDate.Day && secondaryDate.timings.startTime === selectedDate.timings.startTime) {
      dispatch(secondaryAppointmentDate(selectedDate))
    }

    //if(dispatch(secondaryAppointmentDate(selectedDate))
    console.log('newWeekDaysAvailablities', newWeekDaysAvailablities)
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
              {ats.isEnabled &&
              daySelected.Day === primaryDate.Day &&
              ats.availabilityId === primaryDate.timings.timeSlotId ? (
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

              {ats.isEnabled &&
              daySelected.Day === secondaryDate.Day &&
              ats.availabilityId === secondaryDate.timings.timeSlotId ? (
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
              {ats.isEnabled && !ats.isSelected ? (
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
