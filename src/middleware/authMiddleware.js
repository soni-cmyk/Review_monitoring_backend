import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        //  FORCE correct payload shape
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //  ALWAYS set user
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token invalid or expired" });
    }
};
