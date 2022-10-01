import express from "express";
import { validateNameCategorie } from "../middlewares/categorie.middleware.js";
import {
	createCategorie,
	getCategorie,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/categories", validateNameCategorie, createCategorie);
router.get("/categories", getCategorie);

export default router;
