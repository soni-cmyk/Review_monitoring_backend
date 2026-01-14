import { Request, Response } from "express";
import {
  upsertPageService,
  getPageBySlugService
} from "../services/templateService.js";

export const savePageController = async (req: Request, res: Response) => {
  try {
    const page = await upsertPageService(req.body);
    res.json({ success: true, page });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPageController = async (req: Request, res: Response) => {
  try {
    const page = await getPageBySlugService(req.params.slug);
    res.json(page);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
