import Otp from "../../Models/OtpModel.js";
import User from "../../Models/UserModel.js";
import { otpGenerate } from "../../utills/otpGenerate.js";
import { sendEmail } from "../../utills/emailService.js";
import { generateToken } from "../../utills/generateToken.js";
import { validateEmail } from "../../utills/validateEmail.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Please use jcboseust email only" });
    }

    // Check if the user already exists
    const lowerCaseEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: lowerCaseEmail });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Generate OTP and save it in the Otp collection for 10 minutes
    const otp = otpGenerate();
    const existingOtp = await Otp.findOne({ email: lowerCaseEmail });
    if (existingOtp) {
      await Otp.deleteOne({ email: lowerCaseEmail });
    }
    const newOtp = new Otp({ email: lowerCaseEmail, otp });
    await newOtp.save();

    // Send OTP via email
    const emailData = {
      email: lowerCaseEmail,
      subject: "OTP Verification",
      html: `
      <div>
        <h2>Welcome to Our Platform, ${name}!</h2>
        <p>Thank you for registering on our platform. We are excited to have you with us.</p>
        <p>Your OTP for email verification is:</p>
        <h3>${otp}</h3>
        <p>Please enter this OTP to verify your email address.</p>
        <p>If you did not request this email, please ignore it.</p>
        <p>Best regards,</p>
        <p>xxxx xxxx xxxx</p>
      </div>
    `,
    };
    const sendEmailStatus = await sendEmail(emailData);
    // console.log("email status", sendEmailStatus.status);
    if (sendEmailStatus.status !== 200) {
      return res.status(500).json({ error: "Email sending failed" });
    }
    // Inform user that OTP was sent
    return res.status(200).json({
      message: "OTP sent to email. Please verify your OTP.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { name, email, password, gender, otp } = req.body;

    // Check if the OTP is valid and belongs to the user
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Create user and save with verification
    const user = new User({
      name,
      email,
      password,
      gender,
      isVerified: true,
    });
    await user.save();
    // Optionally, delete OTP after successful verification
    await Otp.deleteOne({ email });

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const lowerCaseEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerCaseEmail });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ error: "User is  un-verified or blocked, contact Admin." });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password!" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
