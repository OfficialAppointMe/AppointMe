// pages/AllProfiles/[id].js
"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfileDetail = ({params}) => {
  let router= useRouter();
  
  const { id } = params;
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (id) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/getUserById/${id}`);
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch profile");
          }
          setProfile(data.user);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfile();
    }
  }, [id]);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <img src={profile.image}/>
        <h1 className="text-2xl font-bold mb-4">{profile.name}</h1>
        <p className="text-gray-700 mb-2">Email: {profile.email}</p>
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
          <h1>Users Appointments: {profile.MyAppointments.length} </h1> 
          <h1>Accepted Appointments: {profile.AcceptedAppointments.length}</h1> 
        </div>
        <button className="bg- bg-green-500 text-white" onClick={()=>router.push(`/AllProfiles/${profile._id}/createAppointmentWith`)}>Book an appointment with me</button>
      </div>
    </div>
  );
};

export default ProfileDetail;
