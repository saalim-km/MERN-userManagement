import { Request, Response } from "express";
import { IAminService } from "../service/admin/IAdmin.service.js";
import { IUser } from "../interface/User.interface.js";
import { CreateJwt } from "../utils/createJwt.js";
import { HttpStatus } from "../utils/statusCode.js";

export class AdminController {
    private adminService: IAminService;
    private createJwt : CreateJwt;

    constructor(AdminService: IAminService) {
        this.adminService = AdminService;
        this.createJwt = new CreateJwt();
    }

    public createUser = async (req: Request, res: Response)=> {
        try {
            console.log("create user il  vann" , req.body);
            // const user: IUser = req.body;
            // const newUser = await this.adminService.createUser(user);
            // res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: "an error occured" });
        }
    };

    public login = async (req : Request , res : Response) => {
        try {
            console.log("admin login controller ethi")
            console.log(req.body)
            const {email , password} = req.body;

            const user = await this.adminService.userExists(email);
            if(!user?.isAdmin) {
                res.status(HttpStatus.UNAUTHORIZED).json({message : "Access Denied !!"})
                return;
            }
            if(!user){
                res.status(HttpStatus.UNAUTHORIZED).json({message : "invalid credentials"});
                return;
            } 

            const isMatch = await this.adminService.comparePassword(password , user?.password);
            if(!isMatch) {
                res.status(401).json({message : "invalid credentials"});
                return;
            }

            const {refreshToken , accessToken} = await this.createJwt.createToken(res , user._id?.toString() || "");
            console.log("tokens controller il kitti",refreshToken , accessToken);
            res.status(200).json({message : "Login successful" , user : user , token : {refresh : refreshToken , access : accessToken}});
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "error occured"});
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            console.log(req.params);
            const {userId} = req.params
            const user: Partial<IUser> = req.body;
            console.log(`got user`,user);
            const updatedUser = await this.adminService.updateUser(userId, user);
            res.status(200).json({success : true , message : "User Updated."});
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


    public getUser = async(req : Request, res : Response)=> {
        try {
            console.log("in getuser controller")
            console.log(req.params);

            const {userId} = req.params;
            const userData = await this.adminService.findUser(userId);

            console.log(userData);
            res.status(HttpStatus.OK).json({success : true , message : "got user data" , user : userData});
        } catch (error) {
            console.log(error);
        }
    }
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