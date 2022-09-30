import express from "express";
import {
	createCustomer,
	getCustomers,
} from "../controllers/customers.controller.js";
import { validateCustomerData } from "../middlewares/schemas.middleware.js";

const router = express.Router();

router.post("/customers", validateCustomerData, createCustomer);
router.get("/customers", getCustomers);

export default router;
