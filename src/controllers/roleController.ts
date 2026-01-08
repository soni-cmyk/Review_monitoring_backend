import Role from "../models/RoleModel.js";
import { Request, Response } from "express";

export const createRole =  async (
  req: Request,
  res: Response
): Promise<void> => {
  const role = await Role.create({ role: req.body.role });
  res.json(role);
};
