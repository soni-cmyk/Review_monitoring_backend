import UserRole from "../models/UserRoleModel.js";
export const assignRole = async (req, res) => {
    const { userId, roleId } = req.body;
    const userRole = await UserRole.create({
        userId,
        roleId
    });
    res.json(userRole);
};
