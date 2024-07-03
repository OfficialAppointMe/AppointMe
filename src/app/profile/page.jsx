import { auth } from '@/auth'
import React from 'react'
import ProfileCards from '@/components/profile/ProfileCards';
import NavigationBar from '@/components/dashboardComponents/NavigationBar';
import ProfileComp from '@/components/dashboardComponents/ProfileComp';
import SearchBar from '@/components/profile/SearchBar';

async function ProfilePage() {

    let session = await auth();
    let user = session?.user;
    let email = user?.email;

    ////a fetch request to get all users by his id
    ///stor it in users
    ///display data
    //when you click the get appointment call the api with all the data 
    return (
        <div className='bg-slate-200 h-screen w-screen flex items-center p-5 gap-6'>
            <NavigationBar />
            <div className='bg-green-200 h-[90vh] w-[50vw] rounded-xl p-5'>
                <SearchBar/>
                <ProfileCards />
            </div>
            <ProfileComp/>
        </div>
    )
}

export default ProfilePage