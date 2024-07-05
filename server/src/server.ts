import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import authorRoutes from "./routes/userRoute";
import productRoutes from "./routes/productRoute";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/** Routes */
app.use("/user", authorRoutes);
app.use("/product", productRoutes);

const MONGO_URL: any = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(config.server.port, () => {
      console.log("server running on port " + config.server.port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
