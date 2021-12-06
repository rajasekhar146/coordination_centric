import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import './ScheduleCalendar.Component.css'
// import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import React, { useEffect, useState } from 'react'
const locales = { 'en-US': enUS }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })


const ScheduleCalendar = (props) => {
  const {
    appointmentList
  } = props;

  const [calenderAppointments, serCalenderAppointments] = useState([])

  useEffect(() => {
    if (appointmentList.length) {
      const formattesData = appointmentList.map((appointment) => (
        {
          title: appointment.name,
          start: new Date(appointment.startTime),
          end: new Date(appointment.endTime),
          status: appointment.status
        }
      ))
      serCalenderAppointments(formattesData)
    }
  }, [appointmentList.length])


  const colorcodes = {
    accepted: '#DAFBE8',
    pending: '#F4F3FF',
    cancelled: '#FDE8E6',
    declined: '#FDE8E6',
    request_to_reschedule: '#F79009',
    rescheduled: '#F79009'
  }

  const textColor = {
    accepted: '#027A48',
    pending: '#5925DC',
    cancelled: '#B42318',
    declined: '#FDE8E6',
    request_to_reschedule: '#F79009',
    rescheduled: '#F79009'
  }

  // const CustomToolbar = (props) => {
  //   const navigate = action => {
  //     console.log(action);
      
  //     props.onNavigate(action)
  //   }
  
  //   return (
  //     <div className='rbc-toolbar'>
  //       <span className="rbc-btn-group">
  //         <button type="button" onClick={() => navigate('PREV')}>back</button>
  //         <button type="button" onClick={() => navigate('NEXT')}>next</button>
  //       </span>
  //       {/* <span className="rbc-toolbar-label">{props.label}</span> */}
  //     </div>
  //   );
  // }

  return (
    <div className="io_calender_main">
      <Calendar
        localizer={localizer}
        events={calenderAppointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 715 }}
        timeslots={1}
        // components = {{toolbar : CustomToolbar}}
        eventPropGetter={(event) => {
          const backgroundColor = colorcodes[event.status];
          const style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: textColor[event.status],
            border: '0px',
            display: 'block',
            fontFamily: 'Inter',
            fontWeght: 500,
            fontSize: '14px',
            lineHeight: '15px'
          };
          return {
            style: style
          };
        }}
      />
    </div>
  )
}

export default ScheduleCalendar
