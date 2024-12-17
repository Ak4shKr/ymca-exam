import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  booking: [
    {
      bookingId: {
        type: String,
        required: true, // Unique booking ID (must come from the Booking collection)
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
      bookedSeats: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Room = mongoose.model("Room", RoomSchema);
export default Room;
