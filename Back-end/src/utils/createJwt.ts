import Jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { HttpStatus } from "./statusCode.js";
import { access } from "fs";

export class CreateJwt {
  public createToken = async (res: Response, userId: string) => {
    console.log("Creating tokens...");

    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!accessSecret || !refreshSecret) {
      throw new Error("Secrets are missing!");
    }

    // Generate Access Token (expires in 15 min)
    const accessToken = Jwt.sign({ userId }, accessSecret, {
      expiresIn: "5s",
    });

    // Generate Refresh Token (expires in 30 days)
    const refreshToken = Jwt.sign({ userId }, refreshSecret, {
      expiresIn: "10s",
    });

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    return {
      refreshToken,
      accessToken,
    };
  };

  public refreshAccess = async (refreshToken : string) => {
    try {
      if (!refreshToken) {
        throw new Error("refresh token required to create access token");
      }

      const accessSecret = process.env.ACCESS_TOKEN_SECRET;
      const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

      if (!accessSecret || !refreshSecret) {
        throw new Error("Secrets are missing!");
      }

      Jwt.verify(refreshToken, refreshSecret, (error : any, decode : any) => {
        if (error) throw new Error(error.message);

        const accessToken = Jwt.sign({ userId: decode.userId } , accessSecret , {expiresIn : "15m"});
        return accessToken;
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

}
