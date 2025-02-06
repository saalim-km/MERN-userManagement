import { IUser } from "../../interface/User.interface.js";
export interface IAdminRepository {
    createUser(user : IUser) : Promise<IUser>;
    updateUserById(userid : string , user : Partial<IUser>) : Promise<IUser | null>;
    deleteUserById(userId : string) : Promise<IUser | null>;
    findAllUsers() : Promise<IUser[]>;
    findUsers(user : Partial<IUser>) : Promise<IUser[]>;
    findUserById(userId : string) : Promise<IUser | null>;
    findUserByEmail(email : string) : Promise<IUser | null>;
}