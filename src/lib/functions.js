import crypto from "crypto";
import axios from "axios";
import { decode } from "./jwt.js";

export const hash = (password) =>
  crypto.createHash("md5").update(password).digest("hex");

export const getOAuthUserInfo = async (access_token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
      )
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const extractPayloadFromHeader = async (req) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw "Token is requried";
  }

  const [type, token] = authorization.split(" ");

  if (type != "Bearer") {
    throw "Type must be Bearer";
  }

  return await decode(token);
};
