import { Types } from "mongoose";
import { IUser } from "../../interface/User.interface.js";
export interface IUserService {
    createUser(user : IUser) : Promise<IUser>;
    findUser(userId : string) : Promise<IUser | null>;
    updateUser(userId : Types.ObjectId , user : Partial<IUser>): Promise<IUser | null>;
    findByEmail(email : string) : Promise<IUser | null>
    userExists(email: string): Promise<boolean>;
    comparePassword(password : string , passInDb : string) : Promise<boolean>;
    changePassword(userId : Types.ObjectId , newPassword : string) : Promise<IUser | null>;
}