import express from "express";
import { assignRole } from "../controllers/userRoleController.js";

const router = express.Router();

// Assign role to user
router.post("/assign", assignRole);

export default router;
