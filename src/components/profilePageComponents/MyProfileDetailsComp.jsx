"use client";

import React, { useEffect, useState } from 'react';

const UserDetails = ({ email }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/getCompleteInfoOfUser/${email}`);
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center bg-red-100 p-5 rounded-lg shadow-lg h-fit max-w-lg ">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-lg text-gray-600">{user.email}</p>
      </div>
      <div className="flex justify-around w-full gap-2">
        <div className="bg-white p-4 rounded-lg text-center shadow-md">
          <p className="text-2xl font-semibold text-gray-800">
            {user.MyAppointments.length}
          </p>
          <p className="text-gray-600">My Appointments</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center shadow-md">
          <p className="text-2xl font-semibold text-gray-800">
            {user.PendingAppointments.length}
          </p>
          <p className="text-gray-600">Pending Appointments</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center shadow-md">
          <p className="text-2xl font-semibold text-gray-800">
            {user.AcceptedAppointments.length}
          </p>
          <p className="text-gray-600">Accepted Appointments</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
