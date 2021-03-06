import React, { useEffect, useState } from 'react'
import './NavMonthYear.Component.css'
import BackArrow from '../../../../assets/icons/back_arrow.png'
import NextArrow from '../../../../assets/icons/next_arrow.png'
import Button from '@mui/material/Button'
import moment from 'moment'
import { usePreviousMonthDisabled } from '@mui/lab/internal/pickers/hooks/date-helpers-hooks'
import { useSelector, useDispatch } from 'react-redux'
import { calendarAppointmentDate } from '../../../../redux/actions/commonActions' //'../../../redux/actions/commonActions'

const NavMonthYearComponent = () => {
  const [currentDay, setCurrentDay] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const dispatch = useDispatch()
  const calenderDate = useSelector(state => state.calendarAppointmentDate)
  const [isPastMonth, setPastMonth] = useState(false)
  console.log('Nav Month', calenderDate)
  useEffect(async () => {
    const selectedYear = calenderDate.calenderDate.Year
    const selectedMonth = calenderDate.calenderDate.Month
    const selectedDay = calenderDate.calenderDate.Day

    var selectedDate = await getSelectedDate(selectedYear, selectedMonth, selectedDay)

    var newStartDate = moment(new Date()).format('YYYY-MM-DD')
    if(selectedDate < newStartDate) selectedDate = newStartDate

    
    const today = moment(selectedDate).format('MMMM, YYYY')
    const day = moment(selectedDate).format('YYYY-MM-DD')
    const currentDay = moment(new Date()).format('YYYY-MM-DD')
    console.log('today', today)
    console.log('today >> currentDay', day, currentDay)
    const IsValid = day > currentDay

   

    console.log('isValid', IsValid)
    setPastMonth(!IsValid)
    setCurrentDate(today)
    setCurrentDay(day)
    const calenderDay = {
      Year: moment().format('YYYY'),
      Month: moment().format('MM'),
      Day: moment().format('DD'),
    }
    //dispatch(calendarAppointmentDate(calenderDay))
  }, [calenderDate])

  const setMonth = month => {
    var selectedMonth = moment(currentDay).add(month, 'M')

    var newStartDate = moment(new Date())
    console.log('startDate < newStartDate >> setMonth', selectedMonth, newStartDate)
    if(selectedMonth.format('YYYY-MM-DD') < newStartDate.format('YYYY-MM-DD')) selectedMonth = newStartDate


    const newDay = selectedMonth.format('MMMM, YYYY')
    console.log(selectedMonth.format('dddd, DD'))
    setCurrentDate(newDay)
    setCurrentDay(selectedMonth)
    const calenderDay = {
      Year: selectedMonth.format('YYYY'),
      Month: selectedMonth.format('MM'),
      Day: selectedMonth.format('DD'),
    }
    dispatch(calendarAppointmentDate(calenderDay))
  }

  const getSelectedDate = (year, month, day) => {
    const selectedDay = year + '-' + month + '-' + day
    return moment(selectedDay)
  }

  const previousMonth = () => {
    setMonth(-1)
  }

  const nextMonth = () => {
    setMonth(1)
  }
  return (
    <div className="nmy__main__div">
      <div className="nmy__container">
        <div className="nmy__row">
          <div className="nmy__back__btn">
          {!isPastMonth ?
            <Button onClick={() => previousMonth()}>
              <img src={BackArrow} alt="Back" />
            </Button>
            : (<div className="nmy__space">&nbsp;</div>)
          }
          </div>
          <div className="nmy__content">{currentDate}</div>
          <div className="nmy__next__btn">
            <Button onClick={() => nextMonth()}>
              <img src={NextArrow} alt="Back" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavMonthYearComponent
