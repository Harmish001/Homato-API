import { gerFilterdData } from "../controllers/filter";
import { Router } from "express";

const router = Router();

router.get("/filter/:sortby/:cuisin/:rating/:costperperson", gerFilterdData);

export default router;
