import express from "express";
import {
  addProfessor,
  allBooking,
  BookedSlots,
  bookingByProfessor,
  bookRoom,
  getAvailableRoomsByDate,
  Login,
  Register,
  removeProfessor,
  reportFeedback,
  verifyOTP,
} from "../Controllers/UserController.js";
import {
  createRoom,
  createTest,
  deleteRoom,
  deleteTest,
  getAllProfessors,
  getAllRooms,
  getTests,
  updateProfessor,
} from "../Controllers/AdminController.js";

import { authToken } from "../middleware/authToken.js";
const router = express.Router();

//authentication routes
router.post("/register", Register);
router.post("/verify-otp", verifyOTP);
router.post("/login", Login);

//admin routes
router.get("/all-professor", getAllProfessors);
router.post("/update-professor", updateProfessor);
router.post("/create-room", createRoom);
router.post("/delete-room", deleteRoom);
router.get("all-rooms", getAllRooms);
router.post("/create-test", createTest);
router.get("/get-tests/:id", getTests);
router.delete("/delete-test/:id", deleteTest);

//professor routes
router.get("/available-rooms/:date", getAvailableRoomsByDate);
router.post("/booking", bookRoom);
router.get("/booked", BookedSlots);
router.get("/all-booking", allBooking);
router.post("/add-professor", addProfessor);
router.post("/remove-professor", removeProfessor);
router.get("/booking-professor", bookingByProfessor);
router.post("/report", reportFeedback);

export default router;
