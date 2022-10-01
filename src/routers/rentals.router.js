import express from "express";
import {
	createRental,
	deleteRental,
	returnRental,
} from "../controllers/rentals.controller.js";
import {
	validateCreateRental,
	validateDeleteRental,
	validateReturnRental,
} from "../middlewares/schemas.middleware.js";

const router = express.Router();

router.post("/rentals", validateCreateRental, createRental);
router.post("/rentals/:id/return", validateReturnRental, returnRental);
router.delete("/rentals/:id", validateDeleteRental, deleteRental);

export default router;
