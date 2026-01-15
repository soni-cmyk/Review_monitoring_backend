import { Request, Response } from "express";
import {
  createLogoService,
  getAllLogosService,
  deleteLogoService,
  toggleLogoStatusService,
  updateLogoService,
} from "../services/logoService.js";


/* ================= CREATE ================= */

export const uploadLogo = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const {
      link,
      logoAlt,
      logoWidth,
      logoHeight,
      isActive = true,
    } = req.body;
    const imageUrl = req.file.path;
    const logo = await createLogoService({
      link,
      logoAlt,
      logoWidth: logoWidth ? Number(logoWidth) : undefined,
      logoHeight: logoHeight ? Number(logoHeight) : undefined,

      logoUrl: imageUrl,
      logoFileName: req.file.originalname,
      logoMimeType: req.file.mimetype,
      logoSize: req.file.size,

      isActive,
    });

    res.status(201).json(logo);
  } catch (err: any) {
    console.error("UPLOAD LOGO ERROR:", err);
    res.status(500).json({
      message: "Logo upload failed",
      error: err?.message || "Unknown error",
    });
  }
};

/* ================= READ ================= */
export const getLogos = async (_req: Request, res: Response) => {
  try {
    const logos = await getAllLogosService();
    res.status(200).json(logos);
  } catch (err: any) {
    console.error("GET LOGOS ERROR:", err);
    res.status(500).json({
      message: "Failed to fetch logos",
      error: err?.message || "Unknown error",
    });
  }
};

/* ================= DELETE ================= */
export const deleteLogo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteLogoService(id);
    res.status(200).json({ message: "Logo deleted successfully" });
  } catch (err: any) {
    console.error("DELETE LOGO ERROR:", err);
    res.status(500).json({
      message: "Failed to delete logo",
      error: err?.message || "Unknown error",
    });
  }
};

/* ================= TOGGLE ================= */
export const toggleLogoStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const logo = await toggleLogoStatusService(id);
    res.status(200).json(logo);
  } catch (err: any) {
    console.error("TOGGLE LOGO STATUS ERROR:", err);
    res.status(500).json({
      message: "Failed to toggle logo status",
      error: err?.message || "Unknown error",
    });
  }
};

/* ================= UPDATE ================= */
/**
 * @route   PUT /api/logos/:id
 * @desc    Update logo details
 * @access  Admin
 */
export const updateLogo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      link,
      logoAlt,
      logoWidth,
      logoHeight,
      isActive,
    } = req.body;

    const updatedLogo = await updateLogoService(
      id,
      {
        link,
        logoAlt,
        logoWidth: logoWidth ? Number(logoWidth) : undefined,
        logoHeight: logoHeight ? Number(logoHeight) : undefined,
        isActive,
      },
      req.file // ✅ pass multer file directly
    );

    res.status(200).json(updatedLogo);
  } catch (err: any) {
    console.error("UPDATE LOGO ERROR:", err);
    res.status(500).json({
      message: "Failed to update logo",
      error: err?.message || "Unknown error",
    });
  }
};
