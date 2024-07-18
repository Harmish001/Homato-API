
  import { getMenu, getMenuCategories, postMenu, updateMenu } from "../controllers/menu";
import { Router } from "express";
  
  const router = Router();
  
  router.post("/post/menu/category", postMenu);
  router.get("/get/menu/:id", getMenu);
  router.get("/get/menu/categories/:id", getMenuCategories);
  router.put("/update/menu", updateMenu);
  
  export default router;
  