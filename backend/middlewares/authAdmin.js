import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({ success: false, message: "Not Authorized, login again" });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // Validate admin by checking decoded email
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized, invalid admin" });
    }

    next(); // proceed to next route/controller
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
