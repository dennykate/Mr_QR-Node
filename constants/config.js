export default {
  MONGO_URL:
    process.env.MONGO_URL || "mongodb://127.0.0.1:27017/mini-qr-generator",
  PORT: process.env.PORT || "5000",
  API_PREFIX: "/api",
  secret_key: process.env.SECRET || "Secret for jsonwebtoken",
  expiresIn: 60 * 60,
};
