"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ContentSection({ email }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [MyAppointments, setMyAppointments] = useState([]);
  const [starredAppointments, setStarredAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aStarred, setAStarred] = useState(false);
  const [aAccept, setAAccept] = useState(false);

  const fetchStarred = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/getStarredAppointments/${email}`, {
        cache: 'no-store',
      });
      const data = await res.json();
      setStarredAppointments(data.starredAppointments);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptAppointment = async (id) => {
    try {
      const response = await fetch(`/api/acceptAppointment/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`Error updating appointment: ${response.statusText}`);
      }
      const data = await response.json();
      // Optionally update UI based on response
    } catch (error) {
      console.error('Error Accepting APPOINTMENT:', error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/getCompleteInfoOfUser/${email}`, {
        cache: 'no-store',
      });
      const data = await res.json();
      setMyAppointments(data.user.MyAppointments);
      setUser(data.user._id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStarred = async (id) => {
    try {
      const response = await fetch(`/api/starAnAppointment/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`Error updating appointment: ${response.statusText}`);
      }
      const data = await response.json();
      // Optionally update UI based on response
    } catch (error) {
      console.error('Error toggling starred:', error);
    }
  };

  const toggleStarredByAcceptor = async (id) => {
    try {
      const response = await fetch(`/api/starByAcceptor/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`Error updating appointment: ${response.statusText}`);
      }
      const data = await response.json();
      // Optionally update UI based on response
    } catch (error) {
      console.error('Error toggling starred:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStarred();
  }, [email, aStarred, aAccept]);

  return (
    <div className="h-[90vh] w-[60vw] rounded-xl bg-green-200 p-4">
      <style jsx>{`
        /* Custom scrollbar styles */
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
              <h1 className="text-2xl">Starred Appointments</h1>
            </div>
            <div className="text-white mt-6 h-[26vh] rounded-lg overflow-y-auto custom-scrollbar">
              <div>
                <div>
                  <table className="flex justify-center items-center bg-transparent w-full rounded-lg border-collapse custom-scrollbar">
                    <tbody className="flex flex-col w-full gap-1 overflow-x-auto custom-scrollbar">
                      {starredAppointments.map((app) => (
                        <div
                          key={app._id}
                          onClick={() => router.push(`/profile/${app._id}`)}
                          className="bg-slate-600 flex justify-evenly shadow-lg rounded-lg overflow-x-auto custom-scrollbar"
                        >
                          <div className="border-t-0 custom-scrollbar px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 w-40 overflow-hidden text-overflow-ellipsis">
                            {app.title}
                          </div>
                          <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-40 text-left">
                            {app.startTime}
                          </div>
                          <div className="border-t-0 px-6 align-center border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-40 text-left">
                            {app.endTime}
                          </div>
                          <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-20 text-left">
                            <button
                              className="cursor-pointer"
                              onClick={async (event) => {
                                event.stopPropagation();
                                if (user !== app.withWhom) {
                                  await toggleStarred(app._id);
                                  setAStarred(!aStarred);
                                } else {
                                  await toggleStarredByAcceptor(app._id);
                                  setAStarred(!aStarred);
                                }
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="yellow"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            </button>
                          </div>
                          {user === app.withWhom && (
                            <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-40 text-left">
                              <button
                                onClick={async (event) => {
                                  event.stopPropagation();
                                  await acceptAppointment(app._id);
                                  setAAccept(!aAccept);
                                }}
                              >
                                {app.isAccepted ? "Reject" : "Accept"}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Your appointment */}
          </section>
          <hr className="h-1 bg-amber-800 mb-4 mt-4" />
          <section className="">
            <div className="text-slate-700 text-left p-2 font-bold rounded-lg">
              <h1 className="text-2xl">Your Appointments</h1>
            </div>
            <div className="text-white mt-5 h-[39vh] rounded-lg overflow-y-auto custom-scrollbar">
              <div>
                <div>
                  <table className="flex justify-center items-center bg-transparent w-full rounded-lg border-collapse custom-scrollbar">
                    <tbody className="flex flex-col w-full gap-1 overflow-x-auto custom-scrollbar">
                      {MyAppointments.map((app) => (
                        <div
                        onClick={() => router.push(`/profile/${app._id}`)}
                          key={app._id}
                          className="bg-slate-600 flex justify-evenly shadow-lg rounded-lg overflow-x-auto custom-scrollbar"
                        >
                          <div className="border-t-0 custom-scrollbar px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 w-40 overflow-hidden text-overflow-ellipsis">
                            {app.title}
                          </div>
                          <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-40 text-left">
                            {app.startTime}
                          </div>
                          <div className="border-t-0 px-6 align-center border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-40 text-left">
                            {app.endTime}
                          </div>
                          <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-20 text-left">
                            <button
                              className="cursor-pointer"
                              onClick={async (event) => {
                                event.stopPropagation();
                                await toggleStarred(app._id);
                                setAStarred(!aStarred);
                              }}
                            >
                              {app.isStarred ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  fill="yellow"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default ContentSection;
