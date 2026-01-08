import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: "uploads/products",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});
const fileFilter = (req, file, cb) => {
    const allowed = /jpg|jpeg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
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
