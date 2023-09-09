import UserRepository from "../repositories/userRespositories";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET as string;
type ExpirationDuration = "15m" | "12h" | "1d" | "7d" | "30d";
const JWT_EXPIRATION_DURATION: ExpirationDuration = "1d";

export default class UserService {

    private userRepository: UserRepository = new UserRepository();

    public async registerUser(firstName: string, lastName: string, email: string, password: string) {
        const userExists = await this.userRepository.checkUserExists(email);
        if (userExists) {
            throw new Error("user already exists");
        }
        // TODO: use bcrypt to implement password hashing and salting
        const newUser = await this.userRepository.createUser(firstName, lastName, email, password);

        // Generate JWT for the newly registered user
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION_DURATION }
        );

        return {
            token: token,
            user: newUser
        };
    }

    public async loginUser(email: string, password: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("user not found");
        }
        // TODO: verify against hashed password in db
        if (user.password !== password) {
            throw new Error("incorrect password");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION_DURATION }
        );

        delete user.password;

        return {
            token: token,
            user: user
        };
    }

    public async readAllUsers() {
        const users = await this.userRepository.readAllUsers();
        return users;
    }

    public async readUserById(id: number) {
        const user = await this.userRepository.readUserById(id);
        return user;
    }

    public async updateUserName(id: number, new_first_name: string, new_last_name: string) {
        const updatedUser = await this.userRepository.updateUserName(id, new_first_name, new_last_name);
        return updatedUser;
    }

    public async updateUserEmail(id: number, new_email: string) {
        const userExists = await this.userRepository.checkUserExists(new_email);
        if (userExists) {
            throw new Error("user already exists");
        }
        const updatedUser = await this.userRepository.updateUserEmail(id, new_email);
        return updatedUser;
    }

    public async updateUserPassword(id: number, new_password: string) {
        // TODO: Hash the new password before sending to repository
        const updatedUser = await this.userRepository.updateUserPassword(id, new_password);
        return updatedUser;
    }

    public async deleteUserById(id: number) {
        const user = await this.userRepository.deleteUserById(id);
        return user;
    }

}
