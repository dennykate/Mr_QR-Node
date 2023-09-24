import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import config from "./constants/config.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(config.API_PREFIX + "/v1", routes);

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

mongoose.connect(config.MONGO_URL).then(() => {
  console.log("DB connected");
  app.listen(config.PORT, () => {
    console.log(`Server running at port - ${config.PORT}`);
  });
});
