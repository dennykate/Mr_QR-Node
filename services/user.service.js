import User from "../models/user.model.js";
import { generate } from "../lib/jwt.js";
import { hash } from "../lib/functions.js";

export const _register = async (data) => {
  try {
    if (data.password != data.password_confirmation) {
      throw "Password doesn't match";
    }

    const isExistUser = await User.findOne({ email: data.email });

    if (isExistUser) {
      throw "Email has already taken";
    }

    delete data.password_confirmation;
    delete data.terms;
    data["password"] = hash(data.password);
    data["verified_at"] = null;

    await User.create(data);

    return { message: "Login successful" };
  } catch (error) {
    throw error;
  }
};

export const _login = async (data) => {
  try {
    console.log(data);
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

    return { access_token: token };
  } catch (error) {
    throw "Email or password wrong";
  }
};
