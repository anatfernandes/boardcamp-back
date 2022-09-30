import express from "express";
import {
	createRental,
	deleteRental,
} from "../controllers/rentals.controller.js";
import {
	validateCreateRental,
	validateDeleteRental,
} from "../middlewares/schemas.middleware.js";

const router = express.Router();

router.post("/rentals", validateCreateRental, createRental);
router.delete("/rentals/:id", validateDeleteRental, deleteRental);

export default router;
