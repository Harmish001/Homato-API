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
    brand_details: {
      rating: String,
      delivery_time: String,
      cost_per_person: Number,
      average_cost: Number,
    },
    // products: {
    //   type: [Schema.Types.ObjectId],
    //   ref: "products",
    // },
  },
  { timestamps: true }
);

export const BrandModel = mongoose.model("brands", BrandSchema);
