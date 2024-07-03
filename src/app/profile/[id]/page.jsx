import NavigationBar from '@/components/dashboardComponents/NavigationBar';
import OnesProfile from '@/components/profile/OnesProfile';
import React from 'react'

function ProfilePage({params}) {
  let id= params.id;
  ////a fetch request to get the user by his id
  return (
    <div className='bg-slate-200 h-screen w-screen flex items-center p-5 gap-6'>
      <NavigationBar/>
      <OnesProfile/>
    </div>
  )
}

export default ProfilePage