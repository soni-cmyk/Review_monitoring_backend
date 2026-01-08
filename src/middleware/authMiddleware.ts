import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * JWT payload shape
 */
interface AuthPayload {
  userId: string;
  role: string;
}

/**
 * Extend Express Request
 */
export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    //  FORCE correct payload shape
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthPayload;

    //  ALWAYS set user
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};
