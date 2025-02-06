import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userModel from "../models/User.model.js";
import { HttpStatus } from "../utils/statusCode.js";
import { JwtPayload } from "../interface/JwtPayload.interface.js";
import { RequestHandler } from "express";
import mongoose from "mongoose";



export class UserAuth {
  
  public protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      if (!secret) throw new Error("REFRESH_TOKEN_SECRET is missing");
  
      const authHeader = req.headers.authorization;
      console.log("auth header vann : ",authHeader)
      if (!authHeader) {
        res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: "No access token provided" });
      } else {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.decode(token) as JwtPayload | null;
        console.log("token : ",token);
        console.log("decoded token : ",decoded);

        if (decoded && decoded?.exp * 1000 < Date.now()) {
          console.log("expire aayin thoonanu")
          res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: "Access token expired" });
        }else{
          console.log("expire aayitilla")
          const decode = jwt.verify(token, secret) as { userId: string };
          const userId = new mongoose.Types.ObjectId(decode.userId);
          console.log(userId);
          req.user = userId;
  
          if (!req.user) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: "User not found" });
          } else {
            return next();
          }
        }
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };  

}
