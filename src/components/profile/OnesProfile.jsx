import React from 'react'

const OnesProfile = () => {
    return (
        <div className='bg-green-200 h-[90vh] w-[70vw] rounded-xl p-5 gap-6 flex flex-col'>
            <div className='h-[30vh] w-full flex gap-2 items-center'>
                <lord-icon
                    src="https://cdn.lordicon.com/hrjifpbq.json"
                    trigger="hover"
                    style={{ "width": "150px", "height": "150px", "cursor":"pointer" }}
                ></lord-icon>
                <div className='flex w-full h-[30%] justify-center items-center gap-5'>
                    <div className='font-bold text-lg'>
                        <span className='hover:underline'>UserName</span>
                        <div className='font-light'>workemail@gmail.com</div>
                    </div>
                    <button className='bg-slate-800 rounded-xl text-white p-5 flex justify-center items-center h-12'>Get an Appointment</button>
                </div>
            </div>
            <div className='flex justify-center items-center gap-4 bg-slate-700 w-full h-[10%] p-1 text-white rounded-xl'>
                <hr className='h-1 rotate-90 bg-white w-2'/>
                <div className='font-light flex justify-start'>
                    Occupation: Gynocologist
                </div>
                <hr className='h-1 rotate-90 bg-white w-2'/>
                <div className='font-light flex justify-center'>
                    Office Address: Mein Nahi Bataunga
                </div>
                <hr className='h-1 rotate-90 bg-white w-2'/>
                <div className='font-light flex justify-center'>
                    Contact No.: 911
                </div>
                <hr className='h-1 rotate-90 bg-white w-2'/>
            </div>
        </div>
    )
}

export default OnesProfile
