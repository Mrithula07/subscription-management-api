// This middleware checks if the user is authenticated by verifying the JWT token.
// If the token is valid, it retrieves the user from the database and attaches it to the request object.
// If the token is invalid or not provided, it responds with a 401 Unauthorized status.
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { tokenBlacklist } from "../utils/tokenBlacklist.js"; // Assuming you have a utility to manage blacklisted tokens
const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token || tokenBlacklist.has(token)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
      error: error.message,
    });
  }
};

export default authorize;
