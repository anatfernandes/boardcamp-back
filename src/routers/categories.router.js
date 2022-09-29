import express from "express";
import {
	createCategorie,
	getCategorie,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/categories", createCategorie);
router.get("/categories", getCategorie);

export default router;
