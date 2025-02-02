import { IUser } from "../../interface/User.interface.js";
import { IUserRepository } from "./IUser.repository.js";
import userModel from "../../models/User.model.js";

export class UserRepository implements IUserRepository {
    async craeteUser(user: IUser): Promise<IUser> {
        return await userModel.create(user);
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await userModel.findOne({email : email});
    }

    async findUserById(userId: string): Promise<IUser | null> {
        return await userModel.findById(userId);
    }

    async updateUserById(userId: string, user: Partial<IUser>): Promise<IUser | null> {
        return await userModel.findByIdAndUpdate(userId , user);
    }
}