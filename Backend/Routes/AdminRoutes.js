import express from "express";

import {
  createRoom,
  deleteRoom,
  getAllProfessors,
  getAllRooms,
  updateProfessor,
} from "../Controllers/AdminController/AdminController.js";
const router = express.Router();

//admin routes
router.get("/all-professor", getAllProfessors);
router.post("/update-professor", updateProfessor);
router.post("/create-room", createRoom);
router.delete("/delete-room", deleteRoom);
router.get("/all-rooms", getAllRooms);

export default router;
