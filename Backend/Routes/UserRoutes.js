import express from "express";

import {
  addProfessor,
  allBooking,
  BookedSlots,
  bookingByProfessor,
  bookRoom,
  getAvailableRoomsByDate,
  removeProfessor,
} from "../Controllers/UserController/bookingController.js";

import {
  Login,
  Register,
  verifyOTP,
} from "../Controllers/UserController/authController.js";
import { reportFeedback } from "../Controllers/UserController/otherController.js";

const router = express.Router();

//authentication routes
router.post("/register", Register);
router.post("/verify-otp", verifyOTP);
router.post("/login", Login);

//professor routes
router.get("/available-rooms", getAvailableRoomsByDate);
router.post("/booking", bookRoom);
router.get("/booked", BookedSlots);
router.get("/all-booking", allBooking);
router.post("/add-professor", addProfessor);
router.post("/remove-professor", removeProfessor);
router.get("/booking-professor", bookingByProfessor);
router.post("/report", reportFeedback);

export default router;
