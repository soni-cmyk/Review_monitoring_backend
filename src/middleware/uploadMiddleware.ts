// import multer, { FileFilterCallback } from "multer";
// import path from "path";
// import { Request } from "express";

// const storage = multer.diskStorage({
//   destination: "uploads/products",
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     cb
//   ): void => {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ): void => {
//   const allowed = /jpg|jpeg|png|webp/;
//   const ext = allowed.test(
//     path.extname(file.originalname).toLowerCase()
//   );

//   if (!ext) {
//     cb(new Error("Only images are allowed"));
//     return;
//   }

//   cb(null, true);
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   fileFilter,
// });

// export default upload;

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Make sure to call dotenv.config() IMPORTANT

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "products", // Cloudinary folder
      resource_type: "image",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const upload = multer({ storage });

export default upload;
