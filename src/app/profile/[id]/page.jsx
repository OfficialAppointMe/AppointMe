import ParticularAppointmentComp from '@/components/AppointmentComponents/ParticluarAppointment';
import React from 'react'

function ParticularAppointment({params}) {
  let {id}= params;
  return (
    <div>
        <ParticularAppointmentComp  id={id}/>
    </div>
  )
}

export default ParticularAppointment