import mongoose, { mongo, Schema } from "mongoose";

const subProductSchema = new mongoose.Schema({
  name: { type: String },
  prize: { type: Number },
  is_veg: { type: Boolean },
  rating: { type: Number },
  description: { type: String },
  tag: { type: String },
  image: { type: String },
});

const MenuProduct = new mongoose.Schema({
  sub_product: subProductSchema,
  parent_product_id: { type: Schema.Types.ObjectId, ref: "products" },
  brand_id: { type: Schema.Types.ObjectId, ref: "brands" },
  category_name: { type: String },
});

// const MenuCategoriesSchema = new mongoose.Schema({
//   category_name: { type: String },
//   menu: { type: [MenuProduct] },
//   brand_id: { type: Schema.Types.ObjectId, ref: "brands" },
// });

// const MenuSchema = new mongoose.Schema(
//   {
//     brand_id: { type: Schema.Types.ObjectId, ref: "brands" },
//     brand_menu: {
//       type: [MenuCategoriesSchema],
//     },
//   },
//   { timestamps: true }
// );

export const SubMenuModel = mongoose.model("menus", MenuProduct);
// export const MenuCategoryModel = mongoose.model(
//   "menucategories",
//   MenuCategoriesSchema
// );
