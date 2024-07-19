import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      unique: true,
      require: [true, "please enter a product name"],
    },
    product_image: {
      type: String,
    },
    new_product: {
      type: Boolean,
    },
    brands: {
      type: [Schema.Types.ObjectId],
      ref: "brands",
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("products", ProductSchema);
