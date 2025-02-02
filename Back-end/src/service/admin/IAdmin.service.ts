import { IUser } from "../../interface/User.interface.js";
export interface IAminService {
    createUser(user : IUser) : Promise<IUser>;
    updateUser(userId : string , user : Partial<IUser>) : Promise<IUser | null>;
    deleteUser(userId : string) : Promise<IUser | null>;
    getUsers() : Promise<IUser[]>;
    searchUsers(query: Partial<IUser>): Promise<IUser[]>;
    userExists(email: string): Promise<boolean>;
    findUser(email : string) : Promise<IUser | null>;
    comparePassword(password : string , passInDb : string) : Promise<boolean>;
}