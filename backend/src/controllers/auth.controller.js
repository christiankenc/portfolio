import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

/**
 * Controller for user signup
 * @param {import("express").Request} req - Express request
 * @param {import("express").Response} res - Express response
 * @returns User's info
 */
export const signup = async (req, res) => {
  // get credentials via request
  const { name, email, password } = req.body;

  // try-catch block to catch errors
  try {
    // checks if any of the field is missing
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    // checks if the user exists in the database
    const userExists = await User.findOne({ email });

    // if it does then we can't create using these credentials
    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    // if the user doesn't exist, hash the password using bcryptjs for security
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create the new user with our passed in name, email, and the hashed password
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // save the user to our database
    await user.save();

    // create a token
    generateTokenAndSetCookie(res, user._id);

    // send message, user created
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    // handle errors
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller for user login
 * @param {import("express").Request} req - Express request
 * @param {import("express").Response} res - Express response
 * @returns User's info
 */
export const login = async (req, res) => {
  // get credentials via request
  const { email, password } = req.body;

  // try-catch block to catch errors
  try {
    // check if user is in the database
    const user = await User.findOne({ email });

    // if user does not exists, could be wrong email
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // if user does exists, using bcryptjs compare password with the one in our database
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    // if password does not match, then it is the wrong password
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // once logged in create a token
    generateTokenAndSetCookie(res, user._id, user.role);

    // send message, user logged in
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    // handle errors
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller for user logout
 * @param {import("express").Request} req - Express request
 * @param {import("express").Response} res - Express response
 */
export const logout = async (req, res) => {
  // clear the token
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // send message, user logged out
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

/**
 * Controller for checking if user is authenticated
 * @param {import("express").Request} req - Express request
 * @param {import("express").Response} res - Express response
 * @returns User's info
 */
export const checkAuth = async (req, res) => {
  try {
    // find user in the database
    const user = await User.findById(req.user.id);

    // if user doesn't exists, send message
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // send message, user is authenticated
    return res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    // handle errors
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
