import { Request, Response } from "express";
import {
  createBannerService,
  getAllBannersService,
  deleteBannerService,
  toggleBannerStatusService,
} from "../services/bannerService.js";

export const uploadBanner = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { title, link } = req.body;

    const banner = await createBannerService({
      title,
      link,
      imageUrl: `/uploads/products/${req.file.filename}`,
    });

    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: "Banner upload failed", error });
  }
};

export const getBanners = async (_req: Request, res: Response) => {
  const banners = await getAllBannersService();
  res.json(banners);
};

export const deleteBanner = async (req: Request, res: Response) => {
  await deleteBannerService(req.params.id);
  res.json({ message: "Banner deleted" });
};

export const toggleBannerStatus = async (req: Request, res: Response) => {
  const banner = await toggleBannerStatusService(req.params.id);
  res.json(banner);
};
