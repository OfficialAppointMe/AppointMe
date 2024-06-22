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
      <div className="flex flex-wrap justify-center">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div
              key={profile._id}
              onClick={() => router.push(`/AllProfiles/${profile._id}`)}
              className="cursor-pointer bg-white p-6 m-4 rounded-lg flex shadow-md w-80 hover:bg-gray-200 transition"
            >
              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-2">{profile.name}</h2>
                <p className="text-gray-700">{profile.email}</p>
              </div>
              <img
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#f0f0f0",
                }}
                src={profile.image}
                alt="image"
              />
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
