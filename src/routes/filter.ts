import { gerFilterdData } from "../controllers/filter";
import { Router } from "express";

const router = Router();

router.post("/filter", gerFilterdData);

export default router;
