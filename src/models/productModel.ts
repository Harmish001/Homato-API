import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("products", ProductSchema);
