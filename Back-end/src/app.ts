import express , {Application , Request , Response} from "express";
import { Document, Types } from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { UserRoute } from "./route/User.route.js";
import { AdminRoute } from "./route/Admin.route.js";
import { IUser } from "./interface/User.interface.js";
import cors from "cors";

import { UserController } from "./controller/User.controller.js";
import { UserService } from "./service/user/User.services.js";
import { UserRepository } from "./repository/user/User.repository.js";
import { AdminController } from "./controller/Admin.controller.js";
import { AdminService } from "./service/admin/Admin.service.js";
import { AdminRepository } from "./repository/admin/Admin.repository.js";

declare module "express-serve-static-core" {
    interface Request {
      user?: Types.ObjectId
    }
}

const corsOption = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    credentials: true,
}

export class App {
    public app : Application;
    constructor() {
        dotenv.config();
        this.app = express();
        this.setMiddleware();
        this.setUserRoutes();
        this.setAdminRoutes();
    }

    private setMiddleware() {
        this.app.use(cors(corsOption))
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : true}));
        this.app.use(cookieParser());
    }

    public setUserRoutes() {
        const userRepo = new UserRepository();
        const userService = new UserService(userRepo);
        const userController = new UserController(userService);
        const userRoute = new UserRoute(userController);
        userRoute.setRoutes();
        this.app.use("/user", userRoute.getRouter());
    }

    public setAdminRoutes() {
        const adminRepo = new AdminRepository();
        const adminService = new AdminService(adminRepo);
        const adminController = new AdminController(adminService);
        const adminRoute = new AdminRoute(adminController);
        adminRoute.setRoutes();
        this.app.use("/admin", adminRoute.getRouter());
    }

    public getApp() {
        return this.app;
    }
}