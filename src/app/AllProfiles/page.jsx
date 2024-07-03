"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/getAllUsers');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profiles');
        }
        setProfiles(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading profiles...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by email"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-md"
      />
      <div className="flex flex-wrap justify-center items-center max-h-screen w-screen gap-5 p-2">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div
              key={profile._id}
              onClick={() => router.push(`/AllProfiles/${profile._id}`)}
              className="bg-white p-2 rounded-lg shadow-lg flex justify-center items-center flex-col w-60 h-52 cursor-pointer hover:scale-105 transition ease-out duration-500"
            >

              <img
              src={profile.image}
              alt="image"
              className="rounded-full h-14 w-14 bg-black overflow-hidden flex justify-center items-center"/>
              <h2 className="font-bold">{profile.name}</h2>
              <p className=" truncate w-40">{profile.email}</p>

            </div>
          ))
        ) : (
          <p>No profiles found</p>
        )}
      </div>
    </div>
  );
};

export default AllProfiles;
