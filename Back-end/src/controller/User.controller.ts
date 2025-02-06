import { Request, Response } from "express";
import { IUser } from "../interface/User.interface.js";
import { IUserService } from "../service/user/IUser.service.js";
import { CreateJwt } from "../utils/createJwt.js";
import { HttpStatus } from "../utils/statusCode.js";
import { error } from "console";

export class UserController {
    private userService : IUserService;
    private createJwt : CreateJwt;
    constructor(UserService : IUserService) {
        this.createJwt = new CreateJwt();
        this.userService = UserService;
    }

    public async signUp(req : Request , res : Response) {
        try {
            const user : IUser = req.body;
            console.log(user)
            const newUser = await this.userService.createUser(user);
            if(!newUser) return res.status(HttpStatus.BAD_REQUEST).json({success : false , message : "No User found !!"});

            return res.status(HttpStatus.OK).json({success : true , message : "user registeration successfull" , user: newUser});
        } catch (error : any) {
            console.log(error );
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success : false , message : error.message});
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                console.log("pass error")
                return res.status(HttpStatus.UNAUTHORIZED || 401).json({success : false , message : "Email and password are required"})
            }
    
            const user = await this.userService.findByEmail(email);
            if (!user) {
                console.log("user error")
                return res.status(HttpStatus.UNAUTHORIZED || 400).json({success : false , message : "user not found"});
            }
    
            const isMatch = await this.userService.comparePassword(password, user.password);
            if (!isMatch) {
                console.log("have a good day !!")
                return res.status(HttpStatus.UNAUTHORIZED || 400).json({success : false , message : "Password is incorrect"});
            }
    
            const  {refreshToken , accessToken} = await this.createJwt.createToken(res, user._id?.toString() || "");
            console.log(refreshToken , accessToken)
            res.status(HttpStatus.OK).json({success :true ,  message: "Login successful", user: user , token : {refresh : refreshToken , access : accessToken}});
        } catch (error : any) {
            console.log(error.message);
            console.log({success : false , message : error.message})
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success : false , message : error.message || "an error occured in login controller"});
        }
    }

    public async logout(req : Request , res : Response) {
        try {
            res.clearCookie('jwt')
        } catch (error : any) {
            console.log(error );
            res.status(400).json({message : error.message});
        }
    }

    public async currentUserProfile(req : Request , res : Response) {
        try {
            const user = await this.userService.findUser(req.user?.toString() || "");
            if(!user) {
                return res.status(404).json({message : "User not found"});
            }
            res.status(200).json({user : user});
        } catch (error : any) {
            console.log(error );
            res.status(400).json({message : error.message});
        }
    }

    public async updateUserProfile(req : Request , res : Response) {
        try {
            console.log("data from frontend",req.body);
            console.log("data from req.user : " ,  req.user);

            const userId = req.user;
            if(!userId) {
                throw new Error("user id is not valid");
            }

            const updatedUser = await this.userService.updateUser(userId , req.body);
            console.log("user updated : ",updatedUser);
            res.status(HttpStatus.OK).json({success : true , user : updatedUser});
        } catch (error : any) {
            console.log("eda evada vann")
            console.log(error );
            res.status(400).json({message : error.message});
        }
    }

    public async newAccessToken(req : Request , res : Response){
        try {  
            console.log("in  controlller")

            console.log("req.body : ",req.body)
            const {refreshToken} = req.body;

            console.log("refresh token kitti",refreshToken)
            console.log("started creating access token");

            const newAccessToken =  await this.createJwt.refreshAccess(refreshToken);
            console.log("got new access token :)",newAccessToken);
            res.status(HttpStatus.OK).json({success : true , token : newAccessToken});
        } catch (error : any) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success : false , message : error.message})
        }
    }
}