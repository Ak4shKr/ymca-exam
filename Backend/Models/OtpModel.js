import mongoose from "mongoose";

//OTP model for temporarily storing otp
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});
const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
