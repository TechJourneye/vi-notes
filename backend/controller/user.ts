import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { createSecretToken } from "../util/secretToken.js";
import bcrypt from "bcryptjs";

// SIGNUP
export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      password,
      username,
    });

    const token = createSecretToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    });

    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
    });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  LOGIN
export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    // validation
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({ message: "Incorrect email or password" });
    }

    const token = createSecretToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
    });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};