import React from 'react'
import './DayView.Component.css'
import { useSelector, useDispatch } from 'react-redux'
import { appointmentAvailableTimeSlots } from '../../../../../redux/actions/commonActions' //'../../../redux/actions/commonActions'

const DayViewComponent = props => {
  const {
    ats,
    day,
  } = props
  const dispatch = useDispatch()
  const rweekDaysAvailablities = useSelector(state => state.appointmentAvailableTimeSlots)


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
    <div className="dv__row">
      <div
        className={ats.isSelected ? 'dv__time__text__selected' : 'dv__time__text'}
        key={ats.availabilityId}
        onClick={() => handleSelectedTime(day, ats.availabilityId, ats.availableTimeSlot)}
      >
        {ats.availableTimeSlot}
      </div>
    </div>
  )
}

export default DayViewComponent
