import { Router } from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";
const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
