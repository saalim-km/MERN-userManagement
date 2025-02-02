import { Request, Response } from "express";
import { IUser } from "../interface/User.interface.js";
import { IUserService } from "../service/user/IUser.service.js";
import { CreateJwt } from "../utils/createJwt.js";

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
            const newUser = await this.userService.createUser(user);
            res.status(201).json(newUser);
        } catch (error : any) {
            console.log(error);
            res.status(400).json({message : error.message});
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
    
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
    
            const isMatch = await this.userService.comparePassword(password, user.password);
            if (!isMatch) {
                throw new Error("Password is incorrect");
            }
    
            this.createJwt.createToken(res, user._id?.toString() || "");
            res.status(200).json({ message: "Login successful" });
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : "An error occurred" });
        }
    }

    public async logout(req : Request , res : Response) {
        try {
            res.clearCookie('jwt')
        } catch (error) {
            console.log(error)
        }
    }

    public async currentUserProfile(req : Request , res : Response) {
        try {
            const user = await this.userService.findUser(req.user?.toString() || "");
            if(!user) {
                return res.status(404).json({message : "User not found"});
            }
            res.status(200).json({user : user});
        } catch (error) {
            res.status(400).json({message : error});
        }
    }

    public async updateUserProfile(req : Request , res : Response) {
        try {
            const userId = req.user?.toString() || "";
            const updatedUser = await this.userService.updateUser(userId , req.body);
            res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
            res.status(400).json({message : error});
        }
    }

}