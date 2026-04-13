import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY as string;

export const userVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }

    jwt.verify(token, TOKEN_KEY, async (err: any, data: any) => {
      if (err) {
        return res.status(401).json({ status: false, message: "Invalid token" });
      } else {
        const user = await User.findById(data.id);

        if (user) {
          (req as any).user = user;
          next();
        } else {
          return res.status(401).json({ status: false, message: "User not found" });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};