import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
// Middleware
app.use(express.json());

// Test Route

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Notes Routes
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});