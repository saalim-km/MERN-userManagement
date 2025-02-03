import { UserController } from "../controller/User.controller.js";
import { Request ,Response , Router , NextFunction } from "express";
import { UserAuth } from "../middleware/userAuth.js";

export class UserRoute {
    private userController : UserController;
    private router : Router;
    private userAuth : UserAuth;

    constructor(userController : UserController) {
        this.userController = userController;
        this.router = Router();
        this.userAuth = new UserAuth();
    }

    public setRoutes() {
        console.log("user router here");

        this.router.post("/signup" , async (req : Request , res : Response)=>{
            await this.userController.signUp(req,res)
            }
        );

        this.router.post("/login" , async (req : Request , res : Response)=>{
            await this.userController.login(req,res)
            }
        );

        this.router.get("/logout" , (req : Request , res : Response)=>
            this.userController.logout(req,res)
        );

        this.router.get("/profile", this.userAuth.protect, async (req: Request, res: Response) => {
            await this.userController.currentUserProfile(req, res);
        });
    }

    public getRouter() : Router {
        return this.router;
    }
}