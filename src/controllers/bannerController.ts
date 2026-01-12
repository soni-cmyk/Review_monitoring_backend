import { Request, Response } from "express";
import {
  createBannerService,
  getAllBannersService,
  deleteBannerService,
  toggleBannerStatusService,
  updateBannerService,
} from "../services/bannerService.js";

/* ================= CREATE ================= */
export const uploadBanner = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const {
      title,
      link,
      description,
      buttonLink,
      buttonText,
      isActive = true,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const banner = await createBannerService({
      title,
      link,
      description,
      buttonText,
      buttonLink,
      isActive,
      imageUrl: `/uploads/products/${req.file.filename}`,
    });
    res.status(201).json(banner);
  } catch (err: any) {
    console.error("UPLOAD BANNER ERROR:", err);

    res.status(500).json({
      message: "Banner upload failed",
      error: err?.message || "Unknown error",
    });
  }
};

/* ================= READ ================= */
export const getBanners = async (_req: Request, res: Response) => {
  try {
    const banners = await getAllBannersService();
    res.status(200).json(banners);
  } catch (err: any) {
    console.error("GET BANNERS ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch banners",
      error: err?.message || "Unknown error",
    });
  }
};

/* ================= DELETE ================= */
export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteBannerService(id);

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err: any) {
    console.error("DELETE BANNER ERROR:", err);

    res.status(500).json({
      message: "Failed to delete banner",
      error: err?.message || "Unknown error",
    });
  }
};

/* ================= TOGGLE ================= */
export const toggleBannerStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const banner = await toggleBannerStatusService(id);
    res.status(200).json(banner);
  } catch (err: any) {
    console.error("TOGGLE BANNER ERROR:", err);
    res.status(500).json({
      message: "Failed to toggle banner status",
      error: err?.message || "Unknown error",
    });
  }
};

/**
 * @route   PUT /api/banners/:id
 * @desc    Update banner details
 * @access  Admin
 */
export const updateBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { title, description, link, buttonText, buttonLink, isActive } =
      req.body;

    const banner = await updateBannerService(
      id,
      {
        title,
        description,
        link,
        buttonText,
        buttonLink,
        isActive,
      },
      req.file
    );

    res.status(200).json(banner);
  } catch (err: any) {
    console.error("UPDATE BANNER ERROR:", err);

    res.status(500).json({
      message: "Failed to update banner",
      error: err?.message || "Unknown error",
    });
  }
};
