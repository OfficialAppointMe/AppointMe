"use client";


import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the CSS file
import moment from 'moment';

function MarkedCalendar({ email }) {
  const localizer = momentLocalizer(moment);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAcceptedAppointments = async () => {
      try {
        const res = await fetch(`/api/getAllAcceptedAppointment/${email}`);
        const data = await res.json();
        if (data.success) {
          setAppointments(data.acceptedAppointments);
        } else {
          console.error('Failed to fetch appointments:', data.message);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAcceptedAppointments();
  }, [email]);

  const events = appointments.map(appointment => ({
    title: appointment.title,
    start: new Date(appointment.appointmentDate),
    end: new Date(appointment.appointmentDate),
  }));

  // Custom CSS to style the calendar
  const calendarStyles = `
    .rbc-month-header {
      background-color: #0C0C0C !important; /* Red background for day names */
      color: white !important;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .rbc-row-bg {
      background-color: rgb(110, 231, 201) !important; /* Blue background for dates */
      // color: white !important;
      cursor:default;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
      .rbc-row-content{
            // color: white !important;
        cursor:arrow;
      }
     
    .rbc-event{
          background-color: black !important; /* Blue background for dates */
          cursor:default;
    }
    
    .rbc-today{
          background-color: rgb(104, 182, 204) !important; /* Blue background for dates */

    }
    
    .rbc-month-view{
          border-radius: 10px
    }
  `;

  return (
    <div className='w-[100%] h-full'>
      <style jsx>{calendarStyles}</style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ background: 'transparent' }}
        toolbar={false} // Hide toolbar and navigation buttons
      />
    </div>
  );
}

export default MarkedCalendar;

