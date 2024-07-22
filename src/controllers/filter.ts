import { Request, Response } from "express";
import { handleErrors } from "./product";
import { BrandModel } from "../models/brandsModel";
import { ProductModel } from "../models/productModel";

const FindOtherFilters = async (req: Request, res: Response) => {
	const { sortby, rating, cost_per_person, is_veg } = req.body;

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
				return {};
			// return { brand_name: 1 };
		}
	};

	const getRatingQuery = (rating: number | null) => {
		switch (rating) {
			case -1:
			case null:
				return {};
			default:
				return {
					"brand_details.rating": { $gte: `${rating}` },
				};
		}
	};

	const getCostQuery = (cost: number | null) => {
		switch (cost) {
			case -1:
			case null:
				return {};
			default:
				return {
					"brand_details.cost_per_person": { $lte: cost },
				};
		}
	};

	const getVegQuery = (isVeg: boolean) => {
		switch (isVeg) {
			case false:
				return {};
			default:
				return { "brand_details.is_veg": true };
		}
	};

	const brands = await BrandModel.find(
		{
			...getVegQuery(is_veg),
			...getRatingQuery(rating),
			...getCostQuery(cost_per_person),
		},
		{
			brand_details: 1,
			brand_name: 1,
			brand_logo: 1,
		}
	).sort(getPopularityQuery(sortby));
	res.send({ brands });
};

const FindCuisins = async (req: Request, res: Response) => {
	const { cuisin } = req.body;
	const brands = await ProductModel.findOne({ $text: { $search: cuisin } })
		.populate({
			path: "brands",
			select: "brand_details brand_name brand_logo",
		})
		.select("brands -_id");
	if (brands) {
		return res.send({ brands: brands?.brands });
	} else {
		return res.send({ brands: [] });
	}
};

export const gerFilterdData = async (req: Request, res: Response) => {
	try {
		const { cuisin } = req.body;

		if (cuisin && cuisin != null) {
			return FindCuisins(req, res);
		} else {
			return FindOtherFilters(req, res);
		}
	} catch (error) {
		res.status(400).send(handleErrors(error));
	}
};
