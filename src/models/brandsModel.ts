import mongoose, { Schema } from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    brand_name: {
      type: String,
    },
    brand_logo: {
      type: String,
    },
    brand_menu: {
      type: Schema.Types.ObjectId,
      ref: "menu",
    },
  },
  { timestamps: true }
);

export const BrandModel = mongoose.model("brands", BrandSchema);
