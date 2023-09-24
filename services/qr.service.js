import uploadImage from "../lib/uploadImage.js";
import QrModel from "../models/qr.model.js";

export const _create = async (req) => {
  try {
    const data = req.body;
    const user = req.user;

    const image = await uploadImage(data.svg);

    if (!image) {
      throw { message: "Fail to upload file" };
    }

    data["qrCode"] = image;
    data["created_at"] = new Date();
    data["created_by"] = user.id;
    delete data.svg;

    return await QrModel.create(data);
  } catch (error) {
    throw error;
  }
};

export const _findAll = async () => {
  try {
    const qrs = await QrModel.find();

    return qrs;
  } catch (error) {
    throw error;
  }
};
