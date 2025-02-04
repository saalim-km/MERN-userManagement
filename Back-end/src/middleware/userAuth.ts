import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userModel from "../models/User.model.js";
import { HttpStatus } from "../utils/statusCode.js";
import { JwtPayload } from "../interface/JwtPayload.interface.js";
import { RequestHandler } from "express";



export class UserAuth {
  
  public protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const secret = process.env.REFRESH_TOKEN_SECRET;
      if (!secret) throw new Error("REFRESH_TOKEN_SECRET is missing");
  
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: "No access token provided" });

      } else {

        const token = authHeader.split(" ")[1];
        const decoded = jwt.decode(token) as JwtPayload | null;
        console.log("token",token);
        console.log("decoded token",decoded);
        
        if (!decoded || decoded.expiresIn * 1000 < Date.now()) {
          res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: "Access token expired" });

        } else {

          const decode = jwt.verify(token, secret) as { userId: string };
          req.user = await userModel.findById(decode.userId).select("-password");
  
          if (!req.user) {
            res.status(404).json({ message: "User not found" });
          } else {
            return next(); // Ensure `next()` is called only when valid
          }
        }
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };  

}
