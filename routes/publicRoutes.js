import { Router } from "express";
import { getResources } from "../controllers/publicController.js";

const router = Router();

router.get("/resources", getResources);

export default router;