import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  semester: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,
    enum: ["1", "2"],
    required: true,
  },
  rooms: [
    {
      room: {
        type: mongoose.Schema.Types.ObjectId, // Ensure it's an ObjectId if referencing Room model
        ref: "Room",
        required: true,
      },
      roomNumber: {
        type: String,
        required: true,
      },
      seatsBooked: {
        type: Number,
        required: true,
      },
    },
  ],
  professor: [
    {
      professorId: {
        type: mongoose.Schema.Types.ObjectId, // Ensure it's an ObjectId if referencing User model
        ref: "User",
        required: true,
      },
      professorName: {
        type: String,
        required: true,
      },
    },
  ],
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
