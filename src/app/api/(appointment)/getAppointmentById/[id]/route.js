import { NextResponse } from 'next/server';
import { dbConnect } from '@/utils/dbConnect';
import { Appointment } from '@/model/Appointments';

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    if (!id) {
      return NextResponse.json({
        message: "Appointment ID is missing",
        success: false,
      }, {
        status: 400,
      });
    }

    await dbConnect();

    const foundAppointment = await Appointment.findById(id)
      .populate('withWhom', 'name email')
      .populate('byWhom', 'name email');

    if (!foundAppointment) {
      return NextResponse.json({
        message: "No appointment exists with this ID",
        success: false,
      }, {
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Appointment found",
      success: true,
      appointment: foundAppointment,
    }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    }, {
      status: 500,
    });
  }
};
