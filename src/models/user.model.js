import { Schema, model, modelNames } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  verified_at: {
    type: Date,
  },
  google_id: {
    type: String,
  },
  verified_code: {
    type: String,
  },
  expired_at: {
    type: Number,
  },
});

const User = modelNames.User || model("User", UserSchema);

export default User;
