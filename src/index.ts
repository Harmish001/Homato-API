import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routes/products";
import brandRouter from "./routes/brands";
import menuCategoriesRouter from "./routes/menu";
dotenv.config();

const DBURI = process.env.MONGO_URI || "";
const PORT = process.env.SERVER_PORT || 8000;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(DBURI).then(() => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});

app.use(productRouter);
app.use(brandRouter);
app.use(menuCategoriesRouter);
