import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
  },
  avatar: {
    type: String,
  },
  department: {
    type: String,
    enum: ["Electronic", "Computer", "Mechanical", "Electrical", "Civil"],
    default: "Electronic",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  isAdmin: {
    type: Boolean,
    default: true,
  }
});

const User = mongoose.model("User", UserSchema);
export default User;
