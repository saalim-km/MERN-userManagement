import { IUser } from "../../interface/User.interface.js";
import { IUserService } from "./IUser.service.js";
import { IUserRepository } from "../../repository/user/IUser.repository.js";
import { Bcrypt } from "../../utils/bcrypt.js";

export class UserService implements IUserService {

    private userRepository : IUserRepository;
    private bcrypt : Bcrypt;

    constructor(UserRepository : IUserRepository) {
        this.userRepository = UserRepository;
        this.bcrypt = new Bcrypt();
    }

    async createUser(user: IUser): Promise<IUser> {
        if(!user.email) throw new Error("email is required");
        if(!user.password) throw new Error("password is required");
        if(!user.name) throw new Error("name is required");
        if(!user.profileImage) throw new Error("profile image is required");

        const isUserExist = await this.userRepository.findUserByEmail(user.email);
        if(isUserExist) {
            throw new Error("email already in use!!");
        }

        const hashedPassword = await this.bcrypt.hashPassword(user.password);
        const newUser = await this.userRepository.craeteUser({
            ...user,
            password : hashedPassword
        });
        return newUser;
    }

    async findUser(userId: string): Promise<IUser | null> {
        if(!userId) {
            throw new Error("id is missing !!");
        }
        const isUser = await this.userRepository.findUserById(userId);
        if(!userId) {
            throw new Error("user not found !!");
        }
        return isUser;
    }

    async updateUser(userId: string, user: Partial<IUser>): Promise<IUser | null> {
        if(!userId) {
            throw new Error("id is missing !!");
        }
        if(!user) {
            throw new Error("data is missing for updating user !!");
        }

        const updatedUser = await this.userRepository.updateUserById(
            userId,
             user
        )

        if(!updatedUser) {
            throw new Error("user not found !!");
        }

        return updatedUser;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        if(!email) {
            throw new Error("email is missing");
        }

        const isUser = await this.userRepository.findUserByEmail(email);
        if(!isUser) {
            throw new Error("user not found !!");
        }
        return isUser;
    }

    async userExists(email: string): Promise<boolean> {
        if(!email) {
            throw new Error("email is required to check user existence");
        }
        const isUser = await this.userRepository.findUserByEmail(email);
        if(!isUser) {
            return false;
        }
        return true;
    }

    async changePassword(userId: string, newPassword: string): Promise<IUser | null> {
        if(!userId) {
            throw new Error("id is missing !!");
        }
        if(!newPassword) {
            throw new Error("password is required !!");
        }

        const hashedPassword = await this.bcrypt.hashPassword(newPassword);
        const updatedUser = await this.userRepository.updateUserById(
            userId,
            {
                password : hashedPassword
            }
        )

        if(!updatedUser) {
            throw new Error("user not found !!");
        }

        return updatedUser;
    }

    async comparePassword(password: string, passInDb: string): Promise<boolean> {
        return await this.bcrypt.comparePassword(password,passInDb);
    }
}