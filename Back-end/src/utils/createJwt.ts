import Jwt from "jsonwebtoken";
import { Response } from "express";

export class CreateJwt {
    public createToken = async (res: Response, userId: string) => {
        console.log("Creating tokens...");

        const accessSecret = process.env.ACCESS_TOKEN_SECRET;
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

        if (!accessSecret || !refreshSecret) {
            throw new Error("Secrets are missing!");
        }

        // Generate Access Token (expires in 15 min)
        const accessToken = Jwt.sign({ userId }, accessSecret, { expiresIn: "15m" });

        // Generate Refresh Token (expires in 30 days)
        const refreshToken = Jwt.sign({ userId }, refreshSecret, { expiresIn: "30d" });

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);

        return {
            refreshToken,
            accessToken
        }
    };
} 