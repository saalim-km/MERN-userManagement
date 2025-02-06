import Jwt from "jsonwebtoken";
import { Response } from "express";
import { JwtPayload } from "../interface/JwtPayload.interface.js";

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
      expiresIn: "15m",
    });

    // Generate Refresh Token (expires in 30 days)
    const refreshToken = Jwt.sign({ userId }, refreshSecret, {
      expiresIn: "2d",
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
        console.log("refresh token illa missing aan")
        throw new Error("refresh token required to create access token");
      }

      console.log("refresh token is here mf : ",refreshToken)
      const accessSecret = process.env.ACCESS_TOKEN_SECRET;
      const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

      if (!accessSecret || !refreshSecret) {
        throw new Error("Secrets are missing!");
      }

        const verifyAsync = (token : string , secret : string)=> {
          return new Promise((resolve,rejects)=> {
            Jwt.verify(token,secret,(err,decoded)=> {
              if(err) return rejects(err);

              resolve(decoded);
            })
          })
        }

        console.log("token verify promise started");
        const verifyData = await verifyAsync(refreshToken , refreshSecret) as JwtPayload;
        console.log("after verifying : ",verifyData);

        console.log("refresh token verify aayi");

        const accessToken = Jwt.sign({ userId: verifyData.userId } , accessSecret , {expiresIn : "10s"});
        console.log("access token create aayi : ",accessToken);
        return accessToken;
    } catch (error: any) {
      console.log(error.message);
    }
  }

}
