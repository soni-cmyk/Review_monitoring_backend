import UserRole from "../models/UserRoleModel.js";
export const authorize = (roles = []) => {
    return async (req, res, next) => {
        const userRoles = await UserRole.find({ userId: req.user.userId })
            .populate("roleId");
        const roleNames = userRoles.map(r => r.roleId);
        const hasAccess = roles.some(role => roleNames.includes(role));
        if (!hasAccess) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};
