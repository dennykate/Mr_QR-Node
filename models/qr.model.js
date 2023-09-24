import { Schema, model, modelNames } from "mongoose";

const qrSchema = new Schema({
  qrCode: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const QrModel = modelNames.Qr || model("Qr", qrSchema);

export default QrModel;
