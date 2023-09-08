import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getTest);

// router.post("/users", userController.create);
// router.get("/users", userController.readAll);
// router.get("/users/:id", userController.readOne);
// router.put("/users/:id", userController.update);
// router.delete("/users/:id", userController.delete);

export default router;