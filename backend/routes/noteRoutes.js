import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Note
router.post("/",authMiddleware, createNote);

// Get All Notes
router.get("/",authMiddleware, getNotes);

// Get Single Note
router.get("/:id", authMiddleware,getNoteById);

// Update Note
router.put("/:id",authMiddleware, updateNote);

// Delete Note
router.delete("/:id", authMiddleware,deleteNote);

export default router;