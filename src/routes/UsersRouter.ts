import { Router } from "express";
import { updateUser } from "../controllers/UsersController.js";

const UserRouter = Router();

UserRouter.patch("/", updateUser);

export default UserRouter;
