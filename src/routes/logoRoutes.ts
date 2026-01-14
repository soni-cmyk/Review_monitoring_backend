import { Router } from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
    uploadLogo as uploadLogoController,
    getLogos,
    deleteLogo,
    toggleLogoStatus,
    updateLogo,
} from "../controllers/logoController.js";
import { adminOnly } from "../middleware/adminsOnlyMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// POST upload logo image
router.post("/", upload.single("image"), protect, adminOnly, uploadLogoController);

// GET list logos
router.get("/", protect, getLogos);

// DELETE logo
router.delete("/:id", protect, adminOnly, deleteLogo);

// PATCH toggle active/inactive
router.patch("/:id/toggle", protect, adminOnly, toggleLogoStatus);

// PUT update logo
router.put("/:id", upload.single("image"),  protect, adminOnly, updateLogo);

export default router;