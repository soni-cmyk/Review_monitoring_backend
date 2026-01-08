/* --------------------------
  Admin-only middleware
--------------------------- */
export const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role?.toLowerCase() !== "admin") {
        res.status(403).json({ message: "Admin access only" });
        return;
    }
    next();
};
