import express from "express";

import { isValid } from "../middlewares/qr.middleware.js";
import { Auth_Schema } from "../schemas/user.schema.js";
import { login, register } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", isValid({ schema: Auth_Schema }), register);
userRouter.post("/login", isValid({ schema: Auth_Schema }), login);

export default userRouter;
