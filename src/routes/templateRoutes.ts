import { Router } from "express";
import {
  savePageController,
  getPageController,
  getAllPagesController,
  deletePageController
} from "../controllers/templateController.js";

const router = Router();

router.post("/", savePageController);
router.get("/:slug", getPageController);
router.get("/", getAllPagesController);
router.delete("/:slug", deletePageController);

export default router;
