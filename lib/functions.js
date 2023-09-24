import crypto from "crypto";

export const hash = (password) =>
  crypto.createHash("md5").update(password).digest("hex");
