import { Request, Response } from "express";
import {
  upsertPageService,
  getPageBySlugService,
  getAllPagesService,
  deletePageBySlugService
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

export const getAllPagesController = async (req: Request, res: Response) => {
  try {
    const pages = await getAllPagesService();
    res.json(pages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePageController = async (req: Request, res: Response) => {
  try {
    const result = await deletePageBySlugService(req.params.slug);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};