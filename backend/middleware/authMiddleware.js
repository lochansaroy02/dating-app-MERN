const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const protectRoute = (req, res, next) => {
    // Get token from request headers
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = { protectRoute };
