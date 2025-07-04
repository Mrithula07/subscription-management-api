import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { tokenBlacklist } from "../utils/tokenBlacklist.js"; // Assuming you have a utility to manage blacklisted tokens
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    //Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists with this email");
      error.statusCode = 409; // Conflict
      throw error;
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Create a new user
    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    const token = jwt.sign(
      { userId: newUsers[0]._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    //Commit the transaction
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found with this email");
      error.statusCode = 404; // Not Found
      throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401; // Unauthorized
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const signOut = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required for sign out",
      });
    }

    // Add token to blacklist
    tokenBlacklist.add(token);

    return res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};
