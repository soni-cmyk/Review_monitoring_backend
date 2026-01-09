import { Router } from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadBanner as uploadBannerController,
  getBanners,
  deleteBanner,
  toggleBannerStatus,
} from "../controllers/bannerController.js";

const router = Router();

// POST upload banner
router.post("/", upload.single("image"), uploadBannerController);

// GET list banners
router.get("/", getBanners);

// DELETE banner
router.delete("/:id", deleteBanner);

// PATCH toggle active/inactive
router.patch("/:id/toggle", toggleBannerStatus);

export default router;
