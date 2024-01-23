import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

import productRouter from "./Product/pouter.js";

config();

const { DB_URL, PORT } = process.env;
const app = express();

app.use(express.json())
app.use(express.static("static"))
app.use(fileUpload({}));
app.use("/api", productRouter);

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

startApp();
