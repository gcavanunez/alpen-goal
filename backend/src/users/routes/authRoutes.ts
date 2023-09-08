import express from "express";
import AuthController from "../controllers/authController";

const router = express.Router();
const authController = new AuthController();


router.get("/", authController.authTest);
router.post("/register", authController.register);
router.post("/login", authController.login);


export default router;