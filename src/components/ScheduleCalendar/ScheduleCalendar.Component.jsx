import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import './ScheduleCalendar.Component.css'
// import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
const locales = { 'en-US': enUS }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })
const myEventsList = [
    {
        title: 'Jitus', 
        allDay: true, 
        start: new Date(2021, 10, 24), 
        end: new Date(2021, 10, 24) 
    },
    {
        title: 'Abi', 
        allDay: true, 
        start: new Date(2021, 10, 24), 
        end: new Date(2021, 10, 24) 
    }
]

function ScheduleCalendar() {
  return (
    <div className="main_div">
     
<div>
  
</div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 715 }}
      />
    </div>
  )
}

export default ScheduleCalendar
