import Role from "../models/RoleModel.js";
export const createRole = async (req, res) => {
    const role = await Role.create({ role: req.body.role });
    res.json(role);
};
