import _ from "lodash";

import { CREATE_QR_SCHEMA } from "../schemas/qr.schema.js";
import { _create, _findAll } from "../services/qr.service.js";
import { success, error } from "./response.controller.js";

export const create = async (req, res, next) => {
  try {
    const qr = await _create(req);

    return success(res, qr, 201);
  } catch (e) {
    return error(res, { message: "Fail to process" });
  }
};

export const findAll = async (req, res, next) => {
  try {
    const qrs = await _findAll(req);

    return success(res, qrs, 201);
  } catch (e) {
    return error(res, { message: "Fail to process" });
  }
};
