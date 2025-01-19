import Report from "../../Models/Report.js";
import Room from "../../Models/RoomModel.js";
import User from "../../Models/UserModel.js";

export const createRoom = async (req, res) => {
  try {
    const { number, capacity } = req.body;
    if (!number || !capacity) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const room = await Room.findOne({ number });
    if (room) {
      return res.status(400).json({ error: "Room already exists" });
    }

    const newRoom = new Room({
      number: number,
      totalSeats: capacity,
    });
    await newRoom.save();
    res.status(200).json({ newRoom, message: "Room created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { number } = req.query; // Access the query parameter
    if (!number) {
      return res.status(400).json({ error: "Room number is required" });
    }
    const room = await Room.findOne({ number });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    await Room.findOneAndDelete({ number });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { number, capacity } = req.body;
    if (!number || !capacity) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const room = await Room.findOne({ number });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    room.totalSeats = capacity;
    const updatedRoom = await room.save();
    res.status(200).json({ updatedRoom, message: "Room updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProfessors = async (req, res) => {
  try {
    const professors = await User.find();
    res.status(200).json({ professors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfessor = async (req, res) => {
  try {
    const { professorId, status } = req.body;
    if (!professorId) {
      return res.status(400).json({ message: "Please provide professor." });
    }
    const professor = await User.findById(professorId);
    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }
    professor.isVerified = status;
    await professor.save();
    res.status(200).json({ message: "Professor updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status === "true" || status === "false") {
      filter.seen = status === "true";
    }
    const allReports = await Report.find(filter);
    res
      .status(200)
      .json({ data: allReports, message: `All reports with status ${status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { reportId, status } = req.query;
    if (!reportId) {
      return res.status(400).json({ message: "Please provide report." });
    }
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    report.seen = status;
    await report.save();
    res.status(200).json({ message: "Report updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
