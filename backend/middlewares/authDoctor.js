import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    // ✅ Never touch req.body
    req.docId = decoded.id;
    req.user = { docId: decoded.id };

    next();
  } catch (error) {
    console.error("authDoctor error (catch):", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed. Please login again.",
    });
  }
};

export default authDoctor;
