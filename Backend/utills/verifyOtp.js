import Otp from "../Models/OtpModel.js";

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const otpData = await Otp.findOne({ email, otp });
    if (!otpData) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
