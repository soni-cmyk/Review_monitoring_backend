import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: "uploads/products",
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb
  ): void => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowed = /jpg|jpeg|png|webp/;
  const ext = allowed.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (!ext) {
    cb(new Error("Only images are allowed"));
    return;
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
});

export default upload;
