import UserRole from "../models/UserRoleModel.js";
import { Request, Response } from "express";

export const assignRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, roleId } = req.body;

  const userRole = await UserRole.create({
    userId,
    roleId
  });

  res.json(userRole);
};
