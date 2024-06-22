// import mongoose from "mongoose";


// const appointmentSchema= new mongoose.Schema({
//   title:{
//     type:String,
//     required: true,
//   },
//   description:{
//     type:String,
//     required: true,
//   },
//   withWhom:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User",
//     required: true,
//   },
//   byWhom:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User",
//     required: true,
//   },
//   appointmentDate: {
//     type: Date, // Store the appointment date
    
//   },
//   startTime: {
//     type: String, // Store time in "HH:mm" format
    
//   },
//   endTime: {
//     type: String, // Store time in "HH:mm" format
    
//   },
//   isStarred:{
//     type:Boolean,
//     default:false,
//   },
//   isStarredByAcceptor:{
//     type:Boolean,
//     default:false,
//   },
//   isAccepted:{
//     type:Boolean,
//     default:false,
//   },
// })

// export const Appointment = mongoose.models.Appointment ?? mongoose.model("Appointment", appointmentSchema)

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  withWhom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  byWhom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, // Store time in "HH:mm" format
    required: true,
    validate: {
      validator: function (v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validate HH:mm format
      },
      message: props => `${props.value} is not a valid start time!`,
    },
  },
  endTime: {
    type: String, // Store time in "HH:mm" format
    required: true,
    validate: {
      validator: function (v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validate HH:mm format
      },
      message: props => `${props.value} is not a valid end time!`,
    },
  },
  isStarred: {
    type: Boolean,
    default: false,
  },
  isStarredByAcceptor: {
    type: Boolean,
    default: false,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

appointmentSchema.pre('save', function (next) {
  const appointment = this;
  const [startHour, startMinute] = appointment.startTime.split(':').map(Number);
  const [endHour, endMinute] = appointment.endTime.split(':').map(Number);

  if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
    return next(new Error('End time must be later than start time'));
  }

  next();
});

export const Appointment = mongoose.models.Appointment ?? mongoose.model("Appointment", appointmentSchema);
