"use client"

import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';

const ProfileCards = () => {
    const [requestText, setRequestText] = useState({});
    const [disable, setDisable] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/getAllUsers');
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
            } else {
                console.error(data.message);
            }
        };
        fetchUsers();
    }, []);

    const handleRequest = (userId) => {
        setRequestText(prev => ({ ...prev, [userId]: "Requested" }));
        setDisable(prev => ({ ...prev, [userId]: true }));
    };

    return (
        <div className='flex justify-center items-center flex-col gap-4'>
            {users.map(user => (
                <div key={user._id} className='bg-slate-800 h-[10%] w-[90%] text-white flex justify-evenly items-center rounded-xl hover:h-[15%] hover:w-full cursor-pointer transition-all duration-300 ease-in-out'>
                    <div>
                        <lord-icon
                            src="https://cdn.lordicon.com/hrjifpbq.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{ width: "46px", height: "46px" }}
                        ></lord-icon>
                    </div>
                    <div>
                        {user.name}
                    </div>
                    <Button disabled={disable[user._id]} onClick={() => handleRequest(user._id)}>
                        {requestText[user._id] || "Request An Appointment"}
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default ProfileCards;
