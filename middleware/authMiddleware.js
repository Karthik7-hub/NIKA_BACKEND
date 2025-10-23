import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ message: "No token or invalid header" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-passwordHash");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("Auth Error:", err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default verifyToken;
