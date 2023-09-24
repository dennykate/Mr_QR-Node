import express from "express";

import qrRoute from "./qr.route.js";
import userRoute from "./user.route.js";
import { authHandler } from "../middlewares/auth.middleware.js";

const api = express.Router();

api.use("/qr", authHandler, qrRoute);
api.use("/user", userRoute);

export default api;
