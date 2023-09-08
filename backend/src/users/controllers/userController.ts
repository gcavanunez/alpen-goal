import { Request, Response } from "express";
// import UserService from "../services/userServices";

export default class UserController {

    public getTest = (req: Request, res: Response) => {
        res.send("Hello Users World!");
    }

}
