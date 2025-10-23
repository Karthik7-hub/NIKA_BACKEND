import { Router } from "express";
import verifyToken from "../middleware/authMiddleware.js";
import multer from "multer";
import { uploadResource } from "../controllers/resourceController.js";
import { createFolder, openFolder } from "../controllers/folderController.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post("/folder", verifyToken, createFolder);
router.get("/folder", verifyToken, openFolder);
router.post("/resources", verifyToken, upload.single("file"), uploadResource);

export default router;
