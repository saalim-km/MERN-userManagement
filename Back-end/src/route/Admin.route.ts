import { AdminController } from "../controller/Admin.controller.js";
import { Request, Response, Router, NextFunction } from "express";
import { UserAuth } from "../middleware/userAuth.js";

export class AdminRoute {
    private adminController: AdminController;
    private router: Router;
    private userAuth: UserAuth;

    constructor(adminController: AdminController) {
        this.adminController = adminController;
        this.router = Router();
        this.userAuth = new UserAuth();
    }

    public setRoutes() {
        console.log("admin router here");

        this.router.post("/login", (req: Request, res: Response) =>
            this.adminController.login(req, res)
        );

        this.router.get("/logout", (req: Request, res: Response) =>
            this.adminController.logout(req, res)
        );


        this.router.get("/users", this.userAuth.protect, async (req: Request, res: Response) => {
            await this.adminController.getUsers(req, res);
        });

        this.router.delete("/user/:id", this.userAuth.protect, async (req: Request, res: Response) => {
            await this.adminController.deleteUser(req, res);
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}