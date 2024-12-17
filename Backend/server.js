import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from "./Routes/UserRoutes.js";
import AdminRoutes from "./Routes/AdminRoutes.js";
import { configDotenv } from "dotenv";
configDotenv();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.use(
  cors({
    origin: "https://ymca-exam.vercel.app", // Frontend URL for production
    // origin: "http://localhost:5173", // Frontend URL for development
    credentials: true, // Allow cookies if needed
  })
);

app.use("/api/admin", AdminRoutes);
app.use("/api/admin", UserRoutes);

// connnect mongoose
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

// server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
