import jwt, { decode } from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied.No token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //attach user data to request
    next();
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
