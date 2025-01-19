import express from "express";

import {
  createRoom,
  deleteRoom,
  getAllProfessors,
  getAllRooms,
  getReports,
  updateProfessor,
  updateReport,
  updateRoom,
} from "../Controllers/AdminController/AdminController.js";
const router = express.Router();

//admin routes
// router.post("/admin-login", adminLogin);
router.get("/all-professor", getAllProfessors);
router.post("/update-professor", updateProfessor);
router.post("/create-room", createRoom);
router.delete("/delete-room", deleteRoom);
router.put("/update-room", updateRoom);
router.get("/all-rooms", getAllRooms);
router.get("/all-reports", getReports);
router.put("/update-reports", updateReport);

export default router;
