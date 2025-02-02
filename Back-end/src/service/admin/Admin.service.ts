import { IUser } from "../../interface/User.interface.js";
import { IAminService } from "./IAdmin.service.js";
import { IAdminRepository } from "../../repository/admin/IAdmin.repository.js";
import { Bcrypt } from "../../utils/bcrypt.js";

export class AdminService implements IAminService {

    private bcrypt : Bcrypt;
    private adminRepository : IAdminRepository
    constructor(AdminRepository : IAdminRepository) {
        this.bcrypt = new Bcrypt();
        this.adminRepository = AdminRepository;
    }

    async createUser(user: IUser): Promise<IUser> {
        if(!user.email) {
            throw new Error("email is required");
        }

        const isUserExist = await this.adminRepository.findUserByEmail(user.email);
        if(isUserExist) {
            throw new Error("email already in use!!");
        }

        const hashedPassword = await this.bcrypt.hashPassword(user.password);
        const newUser = await this.adminRepository.createUser({
            ...user,
            password : hashedPassword
        });
        return newUser;
    }

    async updateUser(userId: string, user: Partial<IUser>): Promise<IUser | null> {
        if(!userId) {
            throw new Error("id is missing !!");
        }
        if(!user) {
            throw new Error("data is missing for updating user !!");
        }

        const updatedUser = await this.adminRepository.updateUserById(
            userId,
             user
        )
        if(!updatedUser) {
            throw new Error("user not found !!");
        }
        return updatedUser;
    }

    async deleteUser(userId: string): Promise<IUser | null> {
        if(!userId) throw new Error("userid  is required for deleting user !!");

        const deletedUser = await this.adminRepository.deleteUserById(userId);
        if(!deletedUser) throw new Error("user not found");

        return deletedUser;
    }

    async getUsers(): Promise<IUser[]> {
        const users = await this.adminRepository.findAllUsers();
        if(!users) throw new Error("users not found");
        return users;
    }

    async searchUsers(query: Partial<IUser>): Promise<IUser[]> {
        if(!query) throw new Error("query is required");
        const result = await this.adminRepository.findUsers(query);

        if(!result) throw new Error("no result found with provided query !!");
        return result;
    }

    async userExists(email: string): Promise<boolean> {
        if(!email) throw new Error("email is required !!");
        const isUser = await this.adminRepository.findUserByEmail(email);
        
        if(!isUser) return false;
        return true;
    }

    async findUser(email: string): Promise<IUser | null> {
        if(!email) throw new Error("email is required !!");

        return await this.adminRepository.findUserByEmail(email);
    }

    async comparePassword(password: string, passInDb: string): Promise<boolean> {
        return await this.bcrypt.comparePassword(password,passInDb);
    }
}