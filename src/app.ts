import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/fakeReviewsRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";

const app = express();

/* =======================
   CORS CONFIG (FIXED)
   ======================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173", //for vite dev server
      "http://localhost:3000", //for local testing with react dev server
      "https://review-monitoring-full-stack.vercel.app", //for production client,
        /\.vercel\.app$/,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* Preflight fix */
app.use(cors());

/* =======================
   BODY PARSER
   ======================= */
app.use(express.json());

/* =======================
   STATIC FILES (ESM SAFE)
   ======================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* =======================
   ROUTES
   ======================= */
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/banners", bannerRoutes);


export default app;
