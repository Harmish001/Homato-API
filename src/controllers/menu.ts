import { Request, Response } from "express";
import { handleErrors } from "./product";
import { SubMenuModel } from "../models/menuModel";
import mongoose from "mongoose";

export const postMenu = async (req: Request, res: Response) => {
  try {
    const {
      sub_product: { prize, is_veg, rating, description, name, tag, image },
      parent_product_id,
      brand_id,
      category_name,
    } = req.body;
    const menuCateogry = new SubMenuModel({
      sub_product: { prize, is_veg, rating, description, name, tag, image },
      brand_id,
      parent_product_id,
      category_name,
    });
    menuCateogry.save();
    res.send({ sucess: true, message: "Menu added sucessfully" });
  } catch (error) {
    res.status(400).send(handleErrors(error));
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menu = await SubMenuModel.find(
      { brand_id: id },
      { parent_product_id: 0, brand_id: 0 }
    ).sort({ parent_product_id: 1 });
    res.send({ menu });
  } catch (error) {
    res.status(400).send(handleErrors(error));
  }
};

export const getMenuCategories = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menuCategories = await SubMenuModel.aggregate([
      { $match: { brand_id: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: "$category_name" } },
      { $project: { _id: 0, category_name: "$_id" } },
      { $sort: { parent_product_id: 1 } },
    ]);
    res.send({ menuCategories });
  } catch (error) {
    res.status(400).send(handleErrors(error));
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {
    const {
      menu_id,
      sub_product: { prize, is_veg, rating, description, name, tag, image },
      parent_product_id,
      brand_id,
      category_name,
    } = req.body;
    const menu = await SubMenuModel.findByIdAndUpdate(
      { _id: menu_id },
      {
        $set: {
          sub_product: { prize, is_veg, rating, description, name, tag, image },
          brand_id,
          parent_product_id,
          category_name,
        },
      },
      { new: true }
    );
    res.send({ success: true, message: "Menu updated successfully", menu });
  } catch (error) {
    res.status(400).send(handleErrors(error));
  }
};
