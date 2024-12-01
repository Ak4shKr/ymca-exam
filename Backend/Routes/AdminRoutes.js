import express from "express";

import {
  createRoom,
  deleteRoom,
  getAllProfessors,
  getAllRooms,
  updateProfessor,
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

export default router;
