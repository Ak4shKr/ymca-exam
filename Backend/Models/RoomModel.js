import mongoose from "mongoose";
import { type } from "os";

const RoomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
  },
  bookedSeats: [
    {
      date: {
        type: Date,
      },
      slot: {
        type: String,
        enum: ["1", "2"],
      },
      seats: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Room = mongoose.model("Room", RoomSchema);
export default Room;
