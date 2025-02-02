import Jwt from "jsonwebtoken";
import { Response } from "express";

export class CreateJwt {
    public createToken = async (res : Response,userId : string) => {
        const secret = process.env.JWT_SECRET;
        if(!secret) {
            throw new Error("No secret provided");
        }
        const token = await Jwt.sign({userId : userId} , secret , {expiresIn : "30d"});
        res.cookie('jwt',token,{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge : 30 * 24 * 60 * 1000
        })
    }
} 