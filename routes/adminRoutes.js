import { Router } from "express";
import { getResources, statusDecision } from "../controllers/adminController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = Router();

router.get('/resources', verifyToken, getResources);
router.patch('/resource/:id/status', verifyToken, statusDecision);

export default router;