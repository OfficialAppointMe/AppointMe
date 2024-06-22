"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ParticularAppointmentComp = ({id}) => {
  const router = useRouter();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/getAppointmentById/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch appointment');
        }
        setAppointment(data.appointment);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (isLoading) {
    return <p>Loading appointment details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!appointment) {
    return <p>No appointment found</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Appointment Details</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Title:</h2>
          <p>{appointment.title}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Description:</h2>
          <p>{appointment.description}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Appointment Date:</h2>
          <p>{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Start Time:</h2>
          <p>{appointment.startTime}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">End Time:</h2>
          <p>{appointment.endTime}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Created By:</h2>
          <p>{appointment.byWhom.name} ({appointment.byWhom.email})</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">With Whom:</h2>
          <p>{appointment.withWhom.name} ({appointment.withWhom.email})</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Starred:</h2>
          <p>{appointment.isStarred ? 'Yes' : 'No'}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Starred by Acceptor:</h2>
          <p>{appointment.isStarredByAcceptor ? 'Yes' : 'No'}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Accepted:</h2>
          <p>{appointment.isAccepted ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default ParticularAppointmentComp;
