import express from "express";
import { validateCustomerData } from "../middlewares/schemas.middleware.js";
import {
	createCustomer,
	getCustomers,
	getCustomer,
} from "../controllers/customers.controller.js";

const router = express.Router();

router.post("/customers", validateCustomerData, createCustomer);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);

export default router;
