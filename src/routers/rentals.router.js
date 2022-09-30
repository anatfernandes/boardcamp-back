import express from "express";
import { createRental } from "../controllers/rentals.controller.js";
import { validateRental } from "../middlewares/schemas.middleware.js";

const router = express.Router();

router.post("/rentals", validateRental, createRental);

export default router;
