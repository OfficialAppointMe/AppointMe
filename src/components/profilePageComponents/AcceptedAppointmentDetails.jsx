"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AcceptedAppointments = ({ email }) => {
  const router = useRouter();
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aStared, setAStarred] = useState(false);

  const fetchAcceptedAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/getAllAcceptedAppointments/${email}`, {
        cache: 'no-store',
      });
      const data = await res.json();
      setAcceptedAppointments(data.appointments);
    } catch (error) {
      console.error("Error fetching accepted appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStarredbyAcceptor = async (id) => {
    try {
      const response = await fetch(`/api/starByAcceptor/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`Error updating appointment: ${response.statusText}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error toggling starred:', error);
    }
  };

  useEffect(() => {
    fetchAcceptedAppointments();
  }, [email, aStared]);

  return (
    <div className="h-[90vh] w-[60vw] rounded-xl bg-blue-200 p-4">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #a0a0a0;
          border-radius: 10px;
        }
        .custom-scrollbar td::-webkit-scrollbar {
          width: 1px;
        }
        .custom-scrollbar td::-webkit-scrollbar-thumb {
          background-color: #a0a0a0;
          border-radius: 1px;
        }
      `}</style>
      {isLoading ? (
        <p>Loading appointments...</p>
      ) : (
        <>
          <section>
            <div className="text-slate-700 font-bold text-left p-2 rounded-lg">
              <h1 className="text-2xl">Accepted Appointments</h1>
            </div>
            <div className="text-white mt-6 h-[80%] rounded-lg overflow-y-auto custom-scrollbar">
              <div className="flex flex-col gap-4">
                {acceptedAppointments.map((app) => (
                  <div
                    key={app._id}
                    className="bg-slate-600 p-4 rounded-lg shadow-lg flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold">{app.title}</h2>
                    </div>
                    <p className="text-sm">{app.description}</p>
                    <div className="flex justify-between">
                      <span className="text-sm">Start Time: {app.startTime}</span>
                      <span className="text-sm">End Time: {app.endTime}</span>
                    </div>
                    <p className="text-sm">Creator: {app.nameOfCreator}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AcceptedAppointments;
