import express from "express";

import { isValid } from "../middlewares/qr.middleware.js";
import { CREATE_QR_SCHEMA } from "../schemas/qr.schema.js";
import { create, findAll } from "../controllers/qr.controller.js";

const qrRouter = express.Router();

qrRouter.post("/", isValid({ schema: CREATE_QR_SCHEMA }), create);
qrRouter.get("/", findAll);

export default qrRouter;
