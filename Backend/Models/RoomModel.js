import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
  },
});

const Room = mongoose.model("Room", RoomSchema);
export default Room;
