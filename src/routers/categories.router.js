import express from "express";
import {
	createCategorie,
	getCategorie,
} from "../controllers/categories.controller.js";
import { validateNameCategorie } from "../middlewares/categorie.middleware.js";

const router = express.Router();

router.post("/categories", validateNameCategorie, createCategorie);
router.get("/categories", getCategorie);

export default router;
