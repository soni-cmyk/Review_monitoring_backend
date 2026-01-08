import express from "express";
import { createRole } from "../controllers/roleController.js";

const router = express.Router();

// Create role
router.post("/", createRole);

export default router;
