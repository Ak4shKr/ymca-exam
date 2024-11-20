import mongoose, { Schema } from "mongoose";

// Booking Schema
const bookingSchema = new Schema({
  semester: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  slot: {
    type: String,
    enum: ["1", "2"],
    required: true,
  },
  professor: [
    {
      professorId: {
        type: Schema.Types.ObjectId, // Ensure it's an ObjectId if referencing User model
        ref: "User", // If this references a User model
        required: true,
      },
      professorName: {
        type: String,
        required: true,
      },
    },
  ],
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
