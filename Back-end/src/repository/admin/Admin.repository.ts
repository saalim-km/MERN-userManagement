import userModel from "../../models/User.model.js";
import { IAdminRepository } from "./IAdmin.repository.js";
import { IUser } from "../../interface/User.interface.js";

export class AdminRepository implements IAdminRepository {
    async createUser(user: IUser): Promise<IUser> {
        return await userModel.create(user);
    }

    async updateUserById(userid: string, user: Partial<IUser>): Promise<IUser | null> {
        return await userModel.findByIdAndUpdate(userid , user);
    }

    async findAllUsers(): Promise<IUser[]> {
        return userModel.find({isAdmin : {$ne : true}}).sort({updatedAt : -1});
    }

    async deleteUserById(userId: string): Promise<IUser | null> {
        return await userModel.findByIdAndDelete(userId);
    }
    
    async findUsers(user: Partial<IUser>): Promise<IUser[]> {
        return await userModel.find(user , {isAdmin : {$ne : false}});
    }

    async findUserById(userId: string): Promise<IUser | null> {
        return await userModel.findById(userId);
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await userModel.findOne({email : email});
    }
}