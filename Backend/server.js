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

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
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
