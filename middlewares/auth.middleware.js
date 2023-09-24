import { error } from "../controllers/response.controller.js";
import { decode } from "../lib/jwt.js";

export const authHandler = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return error(res, { message: "Token is requried" });
    }

    const [type, token] = authorization.split(" ");

    if (type != "Bearer") {
      return error(res, { message: "Type must be Bearer" });
    }

    const payload = await decode(token);
    req.user = payload;

    return next();
  } catch (err) {
    return error(res, { message: "Token error" });
  }
};
