import { Router } from "express";
import {
  savePageController,
  getPageController
} from "../controllers/templateController.js";

const router = Router();

router.post("/", savePageController);
router.get("/:slug", getPageController);

export default router;
