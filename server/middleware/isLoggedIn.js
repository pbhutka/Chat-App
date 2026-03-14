import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

const isLoggedIn = async (req, res, next) => {
  try {
    if (!req.cookies?.token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({
        message: "Invalid or expired token",
      });

    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default isLoggedIn;
