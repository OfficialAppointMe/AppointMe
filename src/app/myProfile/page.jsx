import { auth } from '@/auth';
import UploadImage from '@/components/AddUpdateProfile/AddOrUpdatePP'
import AcceptedAppointments from '@/components/profilePageComponents/AcceptedAppointmentDetails';
import UserDetails from '@/components/profilePageComponents/MyProfileDetailsComp';
import { redirect } from 'next/navigation';
import React from 'react'

async function MyProfile() {

  let session= await auth();
  let user= session?.user;

  return (
    <div >
      <div className='w-dvw h-fit flex px-0'>
      <UserDetails email={user?.email}/>
      <UploadImage email={user?.email}/>
      </div>
     
      <AcceptedAppointments email={user?.email}/>
    </div>
  )
}

export default MyProfile