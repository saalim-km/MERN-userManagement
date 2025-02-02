import { IUser } from "../../interface/User.interface.js"
export interface IUserRepository {
    craeteUser(user : IUser) : Promise<IUser>;
    findUserById(userId : string) : Promise<IUser | null>;
    updateUserById(userId : string , user : Partial<IUser>) : Promise<IUser | null>;
    findUserByEmail(email : string) : Promise<IUser | null>;
}