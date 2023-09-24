import { _login, _register } from "../services/user.service.js";
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
