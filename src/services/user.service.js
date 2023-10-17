import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";

import User from "../models/user.model.js";
import { decode, generate } from "../lib/jwt.js";
import {
  extractPayloadFromHeader,
  getOAuthUserInfo,
  hash,
} from "../lib/functions.js";
import sendEmail from "../email/send.js";

export const _register = async (data) => {
  try {
    if (data.password != data.password_confirmation) {
      throw "Password doesn't match";
    }

    const isExistUser = await User.findOne({ email: data.email });

    if (isExistUser) {
      if (isExistUser.password) {
        throw "Email has already taken";
      }

      await User.findOneAndUpdate(
        { email: data.email },
        {
          name: data.name,
          password: hash(data.password),
        }
      );

      return { message: "Register successful" };
    }

    delete data.password_confirmation;
    delete data.terms;
    data["password"] = hash(data.password);
    data["verified_at"] = null;

    await User.create(data);

    return { message: "Register successful" };
  } catch (error) {
    throw error;
  }
};

export const _login = async (data) => {
  try {
    const hashPassword = hash(data.password);

    const user = await User.findOne({
      email: data.email,
      password: hashPassword,
    });

    if (!user) {
      throw "Email or password wrong";
    }

    const payload = {
      id: user._id,
      verified_at: user.verified_at,
    };

    const token = generate(payload);

    return { access_token: token, is_verified: !!payload["verified_at"] };
  } catch (error) {
    throw "Email or password wrong";
  }
};

export const _googleAuth = async (req) => {
  try {
    const userInfo = await getOAuthUserInfo(req.body["access_token"]);
    const { email, sub } = userInfo;

    const isExistUser = await User.findOne({ email: email });

    if (isExistUser) {
      const payload = {
        id: isExistUser._id,
        verified_at: isExistUser.verified_at,
      };

      const token = generate(payload);

      return { access_token: token, is_verified: !!payload["verified_at"] };
    } else {
      const newUser = await User.create({
        name: null,
        email,
        password: null,
        verified_at: new Date(),
        google_id: sub,
      });

      const payload = {
        id: newUser._id,
        verified_at: newUser.verified_at,
      };

      const token = generate(payload);

      return { access_token: token, is_verified: !!payload["verified_at"] };
    }
  } catch (error) {
    console.log(error);
    throw "Unknown error occur";
  }
};

export const _sendCode = async (req) => {
  try {
    const payload = await extractPayloadFromHeader(req);
    const { email } = req.body;

    const code = uuidv4().substring(0, 6);
    const expired_at = new Date().getTime() + 3 * 60 * 1000;

    const res = await User.findOneAndUpdate(new ObjectId(payload.id), {
      verified_code: code,
      expired_at,
    });

    await sendEmail(code, email);

    return { message: "Code has been send to your email" };
  } catch (error) {
    throw "Token error";
  }
};

export const _emailVerify = async (req) => {
  try {
    const payload = await extractPayloadFromHeader(req);
    const { code } = req.body;

    const user = await User.findOne(new ObjectId(payload.id));
    const currentTime = new Date().getTime();

    console.log(code, user.verified_code);

    if (currentTime > user.expired_at) throw "Invalid Code";

    if (code != user.verified_code) throw "Invalid Code";

    await User.findOneAndUpdate(new ObjectId(payload.id), {
      verified_at: new Date(),
    });

    return { message: "User has verified successfully" };
  } catch (error) {
    console.log(error);
    throw "Unknown Error Occur";
  }
};

export const _phoneVerify = async (req) => {
  try {
    const payload = await extractPayloadFromHeader(req);

    await User.findOneAndUpdate(new ObjectId(payload.id), {
      verified_at: new Date(),
    });

    return { message: "User has verified successfully" };
  } catch (error) {
    console.log(error);
    throw "Unknown Error Occur";
  }
};
