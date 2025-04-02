
'use client'
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'dayjs/locale/en';


const localizer = dayjsLocalizer(dayjs);



export const CalendarEl  = () => (
  <div>
    <Calendar
        style={{height: 800, width:800}}
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        messages={{
          today: 'Today',
          previous: 'Back',
          next: 'Next',
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }}
      />
  </div>
)

export default CalendarEl