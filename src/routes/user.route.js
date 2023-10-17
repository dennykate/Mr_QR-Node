import express from "express";

import { isValid } from "../middlewares/qr.middleware.js";
import {
  Auth_Schema,
  Google_Auth_Schema,
  Send_Code_Schema,
} from "../schemas/user.schema.js";
import {
  emailVerify,
  googleAuth,
  login,
  phoneVerify,
  register,
  sendCode,
} from "../controllers/user.controller.js";
import { authHandler } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", isValid({ schema: Auth_Schema }), register);
userRouter.post("/login", isValid({ schema: Auth_Schema }), login);
userRouter.post(
  "/google-auth",
  isValid({ schema: Google_Auth_Schema }),
  googleAuth
);
userRouter.post("/send-code", isValid({ schema: Send_Code_Schema }), sendCode);
userRouter.post("/email-verify", emailVerify);
userRouter.post("/phone-verify", phoneVerify);

export default userRouter;
