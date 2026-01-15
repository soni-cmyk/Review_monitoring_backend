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

// uploadCloudinary.ts
import { Request } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => {
    return {
      folder: "all-images",                           // folder in Cloudinary
      public_id: `${Date.now()}-${file.originalname}`, // custom filename
      format: "png",                                  // optional: force format
    };
  },
});

// Multer middleware
const upload = multer({ storage });

export default upload;
