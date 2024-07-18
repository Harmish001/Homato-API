import { Request, Response } from "express";
import { BrandModel } from "../models/brandsModel";

export const postBrand = async (req: Request, res: Response) => {
  try {
    const {
      brand_name,
      brand_logo,
      brand_details: { rating, delivery_time, cost_per_person, average_cost },
    } = req.body;
    const brand = new BrandModel({
      brand_name,
      brand_logo,
      brand_details: { rating, delivery_time, cost_per_person, average_cost },
    });
    brand.save();
    res.send({ sucess: true, message: "brand added sucessfully", brand });
  } catch (err) {
    res.send({ err });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await BrandModel.find({}).select("brand_name brand_logo");
    res.send({ sucess: true, brands });
  } catch (err) {
    res.send({ err, message: "fail to load" });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const {
      brand_id,
      brand_name,
      brand_logo,
      brand_details: { rating, delivery_time, cost_per_person, average_cost },
    } = req.body;
    const brand = await BrandModel.findByIdAndUpdate(
      { _id: brand_id },
      {
        $set: {
          brand_name,
          brand_logo,
          brand_details: {
            rating,
            delivery_time,
            cost_per_person,
            average_cost,
          },
        },
      },
      { new: true }
    );
    res.send({ sucess: true, message: "brand updated sucessfully", brand });
  } catch (err) {
    res.send({ err, message: "fail to load data for brands" });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await BrandModel.deleteOne({ _id: id });
    res.send({ sucess: true, message: "brand deleted successfully" });
  } catch (err) {
    res.send({ err, message: "fail to load data for brands" });
  }
};
