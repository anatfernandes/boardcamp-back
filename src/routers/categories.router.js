import express from "express";
import { createCategorie } from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/categories", createCategorie);

export default router;
