import { Schema, model, modelNames } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified_at: {
    type: Date,
  },
});

const User = modelNames.User || model("User", UserSchema);

export default User;
