import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userModel from "../models/User.model.js";

export class UserAuth {
  
  public protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const secret = process.env.REFRESH_TOKEN_SECRET;
      if (!secret) throw new Error("REFRESH_TOKEN_SECRET is missing");
  
      const token = req.headers.authorization?.split(' ')[1];
      console.log(req.cookies)
      if (!token) {
        res.status(401).json({ message: "No token provided" });
        return
      }
  
      const decode = jwt.verify(token, secret) as { userId: string };
      req.user = await userModel.findById(decode.userId).select("-password");
  
      if (!req.user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      next();
    } catch (error) {
      console.error(error);
      next(error); // Pass the error to the next middleware
    }
  };

}
