import { Request, Response } from "express";
import UserService from "../services/userServices";

export default class AuthController {
    private userService: UserService = new UserService();

    public authTest = (req: Request, res: Response) => {
        res.send("Hello AUTH World!");
    }

    public register = async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            const newUser = await this.userService.registerUser(firstName, lastName, email, password);
            res.status(201).json({
                status: 201,
                success: true,
                message: "registration success",
                token: newUser.token,
                user: newUser.user
            });
        } catch (error) {
            const message = (error as Error).message;
            if (message === "user already exists") {
                res.status(409).json({ message: "unable to create - user already exists" }); // 409 Conflict
            } else {
                res.status(500).json({ message: "server error" });
            }
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const resData = await this.userService.loginUser(email, password);

            res.status(200).json({
                status: 200,
                success: true,
                message: "Login success",
                token: resData.token,
                user: resData.user
            });
        } catch (error) {
            const message = (error as Error).message;
            if (message === "incorrect password") {
                res.status(400).json({ message: "login failed - incorrect password" });
            } else if (message === "user not found") {
                res.status(400).json({ message: "login failed - user not found" });
            } else {
                res.status(500).json({ message: "server error" });
            }
        }
    }
}
