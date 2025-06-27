import jsonwebtoken from "jsonwebtoken";

/**
 * Generates token and sets user's cookies
 * @param {Request} res - Express response
 * @param {string} userId - User id
 * @param {string} role - User role
 * @returns created token
 */
export const generateTokenAndSetCookie = (res, userId, role) => {
  // create a token with our user id that expires in 7 days
  const token = jsonwebtoken.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // set cookies
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
