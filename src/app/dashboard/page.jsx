import { auth } from '@/auth';
import MarkedCalendar from '@/components/CalendarComponents/MarkedCalendar';
import ContentSection from '@/components/dashboardComponents/ContentSection';
import NavigationBar from '@/components/dashboardComponents/NavigationBar';
import ProfileComp from '@/components/dashboardComponents/ProfileComp.jsx'
import "@/components/dashboardComponents/style/dashboardStyle.css"
import React from 'react'


async function Dashboard() {
  let session = await auth();
  let user = session?.user;
  return (
    <div>
      <div className='flex gap-4 items-center h-screen w-screen justify-center p-2 ultimate_div'>
        <NavigationBar />
        <div className='w-[100%] flex justify-center items-center content_and_profile_div gap-8 h-[90%]'>

          <ContentSection />

          <div className='flex justify-center items-center flex-col gap-20 h-[100%] w-[40%] profile_and_calendar_div'>

            <ProfileComp email={user?.email} name={user?.name} />
            <div className='h-[50%] w-full flex justify-center items-center only_calendar_div'>
              <MarkedCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard