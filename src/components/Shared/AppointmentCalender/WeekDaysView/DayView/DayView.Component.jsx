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
  const [availableTimes, setAvailableTimes] = useState([])
  const primaryDate = useSelector(state => state.primaryAppointmentDate)
  const secondaryDate = useSelector(state => state.secondaryAppointmentDate)
  const dispatch = useDispatch()

  useEffect(() => {
    setAvailableTimes(availableTimeSlots)
  }, [])

  const handleSelectedTime = (newDay, id, availableTimeSlot) => {
    var newWeekDaysAvailablities = []
    var isUnselected = false
    console.log('availableTimeSlot', availableTimeSlot)
    const selectedDay = rweekDaysAvailablities.filter(ad => ad.day === newDay)

    if (selectedDay.length > 0) {
      const newSelectedDay = selectedDay[0]
      console.log('selectedDay', newSelectedDay)
      const ats = newSelectedDay.availableTimeSlots
      var newATS = []
      ats.map(a => {
        if (a.availabilityId === id) {
          const aSelected = a.isSelected
          isUnselected = !aSelected
          const availableTS = { ...a, isSelected: isUnselected }
          newATS.push(availableTS)
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
      Time: availableTimeSlot,
    }

    if (!isUnselected) {
      selectedDate = {
        Day: null,
        Time: null,
      }
    }

    if (primaryDate.Day === null) {
      dispatch(primaryAppointmentDate(selectedDate))
    } else if (secondaryDate.Day === null) {
      dispatch(secondaryAppointmentDate(selectedDate))
    }

    //if(dispatch(secondaryAppointmentDate(selectedDate))

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
              {ats.isEnabled && ats.availableTimeSlot === primaryDate.Time && day === primaryDate.Day ? (
                <div
                  className="dv__time__text__selected"
                  key={ats.availabilityId}
                  onClick={() => handleSelectedTime(day, ats.availabilityId, ats.availableTimeSlot)}
                >
                  {ats.isSelected ? <div className="dv__primary__text dv__selected__primary">Primary</div> : null}
                  <div className="dv__primary__text">{ats.availableTimeSlot}</div>
                </div>
              ) : null}

              {ats.isEnabled && ats.availableTimeSlot === secondaryDate.Time && day === secondaryDate.Day ? (
                <div
                  className="dv__secondary__time__text__selected"
                  key={ats.availabilityId}
                  onClick={() => handleSelectedTime(day, ats.availabilityId, ats.availableTimeSlot)}
                >
                  {ats.isSelected ? <div className="dv__primary__text dv__selected__primary">Secondary</div> : null}
                  <div className="dv__primary__text">{ats.availableTimeSlot}</div>
                </div>
              ) : null}
              {ats.isEnabled ? (
                <div
                  className="dv__time__text"
                  key={ats.availabilityId}
                  onClick={() => handleSelectedTime(day, ats.availabilityId, ats.availableTimeSlot)}
                >
                  {ats.isSelected ? <div className="dv__primary__text dv__selected__primary">Primary</div> : null}
                  <div className="dv__primary__text">{ats.availableTimeSlot}</div>
                </div>
              ) : null}
              {!ats.isEnabled ? <div className="dv__time__disabled">{ats.availableTimeSlot}</div> : null}
            </div>
          ))}
      </div>
    </div>
  )
}

export default DayViewComponent
