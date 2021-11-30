import React from 'react'
import './DayView.Component.css'
import { useSelector, useDispatch } from 'react-redux'
import { appointmentAvailableTimeSlots } from '../../../../../redux/actions/commonActions' //'../../../redux/actions/commonActions'
import DayItem from './DayItem.Component'

const DayViewComponent = props => {
  const { day, dayDesc, availableTimeSlots } = props.avaliableAppointmentDay
  console.log('props >> day', day, availableTimeSlots)
  const rweekDaysAvailablities = useSelector(state => state.appointmentAvailableTimeSlots)
  const dispatch = useDispatch()
  console.log('DayViewComponent >> rweekDaysAvailablities', rweekDaysAvailablities)
  const handleSelectedTime = (newDay, id, availableTimeSlot) => {
    console.log('handleSelectedTime', newDay, id, availableTimeSlot)
    const rdayAvailablities = rweekDaysAvailablities.map(ra => {
      var ats = ra.availableTimeSlots
      if (ra.day === newDay) {
        console.log('handleSelectedTime', ra.availableTimeSlots)
        ra.availableTimeSlots[id - 1].isSelected = true
        return ra
      } else {
        return ra
      }
    })
    //   console.log('rdayAvailablities', rdayAvailablities)
    //   console.log('handleSelectedTime', newDay, id, availableTimeSlot)

    //   if(rdayAvailablities.length > 0){
    //       const rdayAvailablity = rdayAvailablities[0]
    //       const availableTimeSlots = rdayAvailablity.availableTimeSlots
    //       availableTimeSlots[id].isSelected = true

    //   }

    dispatch(appointmentAvailableTimeSlots(rdayAvailablities))
    console.log('new >> rdayAvailablities', rdayAvailablities)
  }
  return (
    <div className="dv__main__div">
      <div className="dv__row">
        <div className="dv__day__desc">{dayDesc}</div>
      </div>
      <hr className="dv__hr__section" />
      <div className="dv__ats">
        {availableTimeSlots &&
          availableTimeSlots.map(ats => (
            <DayItem
              ats={ats}
              day={day}
              
            />

          ))}
      </div>
    </div>
  )
}

export default DayViewComponent
