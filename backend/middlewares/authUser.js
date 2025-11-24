import jwt from "jsonwebtoken";
console.log("✅ authUser middleware loaded");
// Middleware to authenticate user via JWT
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized, Login Again" });
    }

    // Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach decoded data to req.user (safe for all HTTP methods)
    req.user = decoded;

    // Continue to controller
    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
