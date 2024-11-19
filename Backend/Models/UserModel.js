import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    enum: ["Electronic", "Computer", "Mechanical", "Electrical", "Civil"],
    default: "Electronic",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
