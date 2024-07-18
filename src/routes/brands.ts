import {
  deleteBrand,
  getBrands,
  postBrand,
  updateBrand,
} from "../controllers/brands";
import { Router } from "express";

const router = Router();

router.post("/post/brand", postBrand);
router.get("/get/brands", getBrands);
router.put("/update/brand", updateBrand);
router.delete("/delete/brand/:id", deleteBrand);

export default router;
