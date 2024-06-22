import { NextResponse } from 'next/server';
// Adjust the import path as necessary

import { dbConnect } from '@/utils/dbConnect';
import { User } from '@/model/User';
import { Appointment } from '@/model/Appointments';

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    if (!id) {
      return NextResponse.json({
        message: "Email query parameter is missing",
        success: false,
      }, {
        status: 400,
      });
    }

    await dbConnect();

    const foundUser = await User.findById( id )
     
    if (!foundUser) {
      return NextResponse.json({
        message: "No user exists with this email",
        success: false,
      }, {
        status: 404,
      });
    }

    return NextResponse.json({
      message: "User found",
      success: true,
      user: foundUser,
    }, {
      status: 200,
    });
  } catch (error) {
    console.log("I am here 4");

    return NextResponse.json({
      message: error.message,
      success: false,
    }, {
      status: 500,
    });
  }
};
