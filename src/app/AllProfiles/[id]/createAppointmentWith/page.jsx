import { auth } from '@/auth';
import CreateAppointment from '@/components/AppointmentComponents/CreateAppointments';
import React from 'react'


async function CreateAppointmentWith({params}) {
  let session = await auth();
  let user= session?.user;
  let {id}= params;
  return (
    <div>
      <CreateAppointment id={id} email={user?.email}  />
    </div>
  )
}

export default CreateAppointmentWith