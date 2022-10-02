import express from "express";
import { validateCreateRental } from "../middlewares/createRental.middleware.js";
import { validateReturnRental } from "../middlewares/returnRental.middleware.js";
import { validateDeleteRental } from "../middlewares/deleteRental.middleware.js";
import {
	createRental,
	getRentals,
	deleteRental,
	returnRental,
} from "../controllers/rentals.controller.js";

const router = express.Router();

router.get("/rentals", getRentals);
router.post("/rentals", validateCreateRental, createRental);
router.post("/rentals/:id/return", validateReturnRental, returnRental);
router.delete("/rentals/:id", validateDeleteRental, deleteRental);

export default router;
