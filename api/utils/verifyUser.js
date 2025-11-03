import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.access_token; 

    if (!token) {
      return next(errorHandler(401, "Unauthorized: No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return next(errorHandler(401, "Unauthorized: Invalid token"));
  }
};
