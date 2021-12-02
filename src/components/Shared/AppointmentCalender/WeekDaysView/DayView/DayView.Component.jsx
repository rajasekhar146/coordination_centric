import React, { useEffect, useState } from 'react'
import './DayView.Component.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  appointmentAvailableTimeSlots,
  primaryAppointmentDate,
  secondaryAppointmentDate,
} from '../../../../../redux/actions/commonActions' //'../../../redux/actions/commonActions'
import get from 'lodash.get'

const DayViewComponent = props => {
  const {
    setAvaliableAppointmentDays,
    avaliableAppointmentDay
  } = props
  const { day, dayDesc, availableTimeSlots = [] } = avaliableAppointmentDay
  var rweekDaysAvailablities = props.avaliableAppointmentDays
  const [availableTimes, setAvailableTimes] = useState([])
  const primaryDate = useSelector(state => state.primaryAppointmentDate)
  const secondaryDate = useSelector(state => state.secondaryAppointmentDate)
  const dispatch = useDispatch()

  useEffect(() => {
    setAvailableTimes(availableTimeSlots)
  }, [availableTimeSlots.length])

  const handleSelectedTime = (newDay, id, availableTimeSlot, type) => {
    var newWeekDaysAvailablities = []
    let isUnselected
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
      setAvaliableAppointmentDays([...newWeekDaysAvailablities])
    }

    var selectedDate = {
      Day: newDay,
      Time: {
        startTime: availableTimeSlot.startTime,
        endTime: availableTimeSlot.endTime
      }
    }

    if (!isUnselected) {
      selectedDate = {
        Day: null,
        Time: {
          startTime: null,
          endTime: null
        }

      }
    }

    if (primaryDate.Day === null) {
      dispatch(primaryAppointmentDate(selectedDate))
    } else if (type === 'primary') {
      dispatch(primaryAppointmentDate(selectedDate))
    } else if (secondaryDate.Day === null) {
      dispatch(secondaryAppointmentDate(selectedDate))
    } else if (type === 'secondary') {
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
              {get(ats, ['availableTimeSlots', 'startTime'], null) === primaryDate.Time.startTime && day === primaryDate.Day ?
                <div
                  className={ats.isSelected ? 'dv__time__text__selected' : 'dv__time__text'}
                  key={ats.availabilityId}
                  onClick={() => handleSelectedTime(day, ats.availabilityId, ats.availableTimeSlots, 'primary')}
                >
                  {ats.isSelected ? <div className="dv__primary__text dv__selected__primary">Primary</div> : null}
                  <div className="dv__primary__text">{`${ats.availableTimeSlots.startTime} - ${ats.availableTimeSlots.endTime}`}</div>
                </div> : get(ats, ['availableTimeSlots', 'startTime'], null) === secondaryDate.Time.startTime && day === secondaryDate.Day ?
                  <div
                    className="dv__secondary__time__text__selected"
                    key={ats.availabilityId}
                    onClick={() => handleSelectedTime(day, ats.availabilityId, ats.availableTimeSlots, 'secondary')}
                  >
                    {ats.isSelected ? <div className="dv__primary__text dv__selected__primary">Secondary</div> : null}
                    <div className="dv__primary__text">{`${ats.availableTimeSlots.startTime} - ${ats.availableTimeSlots.endTime}`}</div>
                  </div> : !ats.isEnabled ?  <div className="dv__time__disabled">{`${ats.availableTimeSlots.startTime} - ${ats.availableTimeSlots.endTime}`}</div>
                    :
                    <div
                      className="dv__time__text"
                      key={ats.availabilityId}
                      onClick={() => handleSelectedTime(day, ats.availabilityId, ats.availableTimeSlots, null)}
                    >
                      <div className="dv__primary__text">{`${ats.availableTimeSlots.startTime} - ${ats.availableTimeSlots.endTime}`}</div>
                    </div>
              }

              {/* {ats.isEnabled && get(ats, ['availableTimeSlots', 'startTime'], null) === primaryDate.Time.startTime && day === primaryDate.Day ? (
                <div
                  className="dv__time__text__selected"
                  key={ats.availabilityId}
                  onClick={() => handleSelectedTime(day, ats.availabilityId, ats.availableTimeSlots, 'primary')}
                >
                  {ats.isSelected ? <div className="dv__primary__text dv__selected__primary">Primary</div> : null}
                  <div className="dv__primary__text">{`${ats.availableTimeSlots.startTime} - ${ats.availableTimeSlots.endTime}`}</div>
                </div>
              ) : null} */}

              {/* {ats.isEnabled && get(ats, ['availableTimeSlots', 'startTime'], null) === secondaryDate.Time.startTime && day === secondaryDate.Day ? (
                <div
                  className="dv__secondary__time__text__selected"
                  key={ats.availabilityId}
                  onClick={() => handleSelectedTime(day, ats.availabilityId, ats.availableTimeSlots, 'secondary')}
                >
                  {ats.isSelected ? <div className="dv__primary__text dv__selected__primary">Secondary</div> : null}
                  <div className="dv__primary__text">{`${ats.availableTimeSlots.startTime} - ${ats.availableTimeSlots.endTime}`}</div>
                </div>
              ) : null} */}
              {/* {ats.isEnabled ? (
                <div
                  className="dv__time__text"
                  key={ats.availabilityId}
                  onClick={() => handleSelectedTime(day, ats.availabilityId, ats.availableTimeSlots, null)}
                >
                  {ats.isSelected ? <div className="dv__primary__text dv__selected__primary">Primary</div> : null}
                  <div className="dv__primary__text">{`${ats.availableTimeSlots.startTime} - ${ats.availableTimeSlots.endTime}`}</div>
                </div>
              ) : null}
              {!ats.isEnabled ? <div className="dv__time__disabled">{`${ats.availableTimeSlots.startTime} - ${ats.availableTimeSlots.endTime}`}</div> : null} */}
            </div>
          ))}
      </div>
    </div>
  )
}

export default DayViewComponent
