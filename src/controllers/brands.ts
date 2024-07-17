import { Request, Response } from "express";
import { BrandModel } from "../models/brandsModel";

export const postBrand = async (req: Request, res: Response) => {
  try {
    const { brand_name, brand_logo } = req.body;
    const brand = new BrandModel({ brand_name, brand_logo });
    brand.save();
    res.send({ sucess: true, message: "brand added sucessfully", brand });
  } catch (err) {
    res.send({ err });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brand = await BrandModel.find({});
    res.send({ sucess: true, message: "brand added sucessfully", brand });
  } catch (err) {
    res.send({ err, message: "fail to load" });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { brand_id, brand_name, brand_logo } = req.body;
    const brand = await BrandModel.find(
      { _id: brand_id },
      {
        $set: {
          brand_name,
          brand_logo,
        },
      }
    );
    res.send({ sucess: true, message: "brand updated sucessfully", brand });
  } catch (err) {
    res.send({ err, message: "fail to load data for brands" });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { brand_id } = req.body;
    await BrandModel.deleteOne({ _id: brand_id });
    res.send({ sucess: true, message: "brand deleted successfully" });
  } catch (err) {
    res.send({ err, message: "fail to load data for brands" });
  }
};
