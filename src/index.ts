import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DBURI = process.env.MONGO_URI || "";
const PORT = process.env.SERVER_PORT || 4000;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(DBURI).then(() => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
