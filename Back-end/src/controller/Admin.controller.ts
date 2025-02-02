import { Request, Response } from "express";
import { IAminService } from "../service/admin/IAdmin.service.js";
import { IUser } from "../interface/User.interface.js";
import { CreateJwt } from "../utils/createJwt.js";

export class AdminController {
    private adminService: IAminService;
    private createJwt : CreateJwt;

    constructor(AdminService: IAminService) {
        this.adminService = AdminService;
        this.createJwt = new CreateJwt();
    }

    public createUser = async (req: Request, res: Response)=> {
        try {
            const user: IUser = req.body;
            const newUser = await this.adminService.createUser(user);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: "an error occured" });
        }
    };

    public login = async (req : Request , res : Response) => {
        try {
            const {email , password} = req.body;
            const user = await this.adminService.findUser(email);
            if(!user){
                res.status(401).json({message : "invalid credentials"});
                return;
            } 

            const isMatch = await this.adminService.comparePassword(password , user?.password);
            if(!isMatch) {
                res.status(401).json({message : "invalid credentials"});
                return;
            }

            this.createJwt.createToken(res , user._id?.toString() || "");
            res.status(200).json({message : "Login successful"});
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "error occured"});
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            const userId: string = req.params.id;
            const user: Partial<IUser> = req.body;
            const updatedUser = await this.adminService.updateUser(userId, user);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: "an error occured" });
        }
    };

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const userId: string = req.params.id;
            const deletedUser = await this.adminService.deleteUser(userId);
            res.status(200).json(deletedUser);
        } catch (error) {
            res.status(400).json({ message: "an error occured please try agian later" });
        }
    };

    public getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.adminService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: "an error occured please try agian later" });
        }
    };

    public searchUsers = async (req: Request, res: Response) => {
        try {
            const query: Partial<IUser> = req.body;
            const result = await this.adminService.searchUsers(query);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: "an error occured please try agian later" });
        }
    };

    public logout = async (req : Request , res : Response) => {
        try {
            res.clearCookie('jwt');
            res.status(200).json({message : "logout successful"});
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "an error occured please try agian later"});
        }
    }
}