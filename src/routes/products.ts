import {
  deleteFoodProduct,
  getFoodProduct,
  postFoodProduct,
  updateFoodProduct,
} from "../controllers/product";
import { Router } from "express";

const router = Router();

router.post("/post/food/product", postFoodProduct);
router.get("/get/products", getFoodProduct);
router.put("/update/product", updateFoodProduct);
router.delete("/delete/product/:id", deleteFoodProduct);

export default router;
