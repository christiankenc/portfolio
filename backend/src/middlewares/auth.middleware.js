import jsonwebtoken from "jsonwebtoken";

/**
 *
 * @param {import("express").Request} req - Express request
 * @param {import("express").Response} res - Express response
 * @param {import("express").NextFunction} next - Run next function
 * @returns message if unauthorized
 */
export const verifyToken = (req, res, next) => {
  // get user's token
  const token = req.cookies.token;

  // try-catch block to catch errors
  try {
    // if token doesn't exists, then user isn't authenticated
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - no token provided" });
    }

    // if it does exist, decode it using jsonwebtoken verify()
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    // set user's id
    req.user = { id: decoded.userId, role: decoded.role };

    // run the next function
    next();
  } catch (error) {
    // handle errors
    console.error("Error:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized - invalid or expired token",
    });
  }
};

/**
 *
 * @param {import("express").Request} req - Express request
 * @param {import("express").Response} res - Express response
 * @param {import("express").NextFunction} next - Run next function
 * @returns Access if user role === admin
 */
export const adminRoute = (req, res, next) => {
  // check if is a user, and role is admin
  if (req.user && req.user.role === "admin") {
    // run the next function
    next();
  } else {
    // handle errors
    return res
      .status(403)
      .json({ success: false, message: "Access denied - admin only" });
  }
};
