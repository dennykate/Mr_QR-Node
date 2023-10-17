import * as R from "ramda";

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

export const _findAll = async (req) => {
  try {
    const user = req.user;

    const query = req.query;
    const page = parseInt(query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const total = await QrModel.countDocuments({ created_by: user.id });
    let qrs = await QrModel.find({ created_by: user.id })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    qrs = qrs.map((qr) => {
      return R.omit([], qr);
    });

    return { data: qrs, total };
  } catch (error) {
    throw error;
  }
};
