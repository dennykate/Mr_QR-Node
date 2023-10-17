import { authHandler } from "../middlewares/auth.middleware.js";
import {
  _emailVerify,
  _googleAuth,
  _login,
  _phoneVerify,
  _register,
  _sendCode,
} from "../services/user.service.js";
import { success, error } from "./response.controller.js";

export const register = async (req, res) => {
  try {
    const user = await _register(req.body);

    return success(res, user);
  } catch (err) {
    return error(res, { message: err });
  }
};

export const login = async (req, res) => {
  try {
    const user = await _login(req.body);

    return success(res, user);
  } catch (err) {
    return error(res, { message: err });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const user = await _googleAuth(req);

    return success(res, user);
  } catch (err) {
    return error(res, { message: err });
  }
};

export const sendCode = async (req, res) => {
  try {
    const message = await _sendCode(req);

    return success(res, message);
  } catch (err) {
    return error(res, { message: err });
  }
};

export const emailVerify = async (req, res) => {
  try {
    const message = await _emailVerify(req);

    return success(res, message);
  } catch (err) {
    return error(res, { message: err });
  }
};

export const phoneVerify = async (req, res) => {
  try {
    const message = await _phoneVerify(req);

    return success(res, message);
  } catch (err) {
    return error(res, { message: err });
  }
};
