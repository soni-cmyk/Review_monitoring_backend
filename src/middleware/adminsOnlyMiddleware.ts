import { Request, Response, NextFunction } from "express";

/* --------------------------
  Extend Request to include `user`
--------------------------- */
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
    [key: string]: any;
  };
}

/* --------------------------
  Admin-only middleware
--------------------------- */
export const adminOnly = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role?.toLowerCase() !== "admin") {
    res.status(403).json({ message: "Admin access only" });
    return;
  }
  next();
};
