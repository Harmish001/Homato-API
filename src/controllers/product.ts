import { Request, Response } from "express";
import { ProductModel } from "../models/productModel";

export const handleErrors = (err: any) => {
  const error = {
    success: false,
    message: err.message,
  };
  return error;
};

export const postFoodProduct = async (req: Request, res: Response) => {
  try {
    const { product_name, product_image, new_product } = req.body;
    const product = new ProductModel({
      product_name,
      product_image,
      new_product,
    });
    product.save();
    res.send({ success: true, message: "product added sucessfully" });
  } catch (error) {
    res.status(400).send(handleErrors(error));
  }
};

export const getFoodProduct = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({}).select(
      "product_name product_image new_product"
    );
    res.send({ success: true, products });
  } catch (error) {
    res.status(400).send(handleErrors(error));
  }
};

export const updateFoodProduct = async (req: Request, res: Response) => {
  try {
    const { product_id, product_name, product_image, new_product } = req.body;
    const product = await ProductModel.findByIdAndUpdate(
      { _id: product_id },
      {
        $set: {
          product_name,
          product_image,
          new_product,
        },
      },
      { new: true }
    );
    res.send({
      success: true,
      message: "product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).send(handleErrors(error));
  }
};

export const deleteFoodProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ProductModel.findOneAndDelete({ _id: id });
    res.send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    res.status(400).send(handleErrors(error));
  }
};
