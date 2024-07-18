import { Request, Response } from "express";
import { handleErrors } from "./product";
import { BrandModel } from "../models/brandsModel";

const getPopularityQuery = (value: number): { [key: string]: 1 | -1 } => {
  switch (value) {
    case 0: // Popularity
    case 1: // Rating High to Low
      return { "brand_details.rating": -1 };
    case 2: // Delivery time
      return { "brand_details.delivery_time": 1 };
    case 3: // Cost Low to High
      return { "brand_details.average_cost": 1 };
    case 4: // Cost High to Low
      return { "brand_details.average_cost": -1 };
    default:
      return { brand_name: 1 };
  }
};

const getRatingQuery = (rating: string | null) => {
  switch (rating) {
    case "-1":
    case "null":
    case "undefined":
      return {};
    default:
      return {
        "brand_details.rating": { $gte: `${rating}` },
      };
  }
};

const getCostQuery = (cost: string | null) => {
  switch (cost) {
    case "-1":
    case "null":
    case "undefined":
      return {};
    default:
      return {
        "brand_details.cost_per_person": { $lte: cost },
      };
  }
};

export const gerFilterdData = async (req: Request, res: Response) => {
  try {
    const { sortby, cuisin, rating, costperperson } = req.params;
    const newSortBy = parseInt(sortby);

    const menus = await BrandModel.find(
      { ...getRatingQuery(rating), ...getCostQuery(costperperson) },
      {
        brand_details: 1,
        brand_name: 1,
        brand_logo: 1,
      }
    ).sort(getPopularityQuery(newSortBy));
    res.send({ menus });
  } catch (error) {
    res.status(400).send(handleErrors(error));
  }
};
