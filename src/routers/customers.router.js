import express from "express";
import { validateCustomerData } from "../middlewares/customer.middleware.js";
import {
	createCustomer,
	getCustomers,
	getCustomer,
	updateCustomer,
} from "../controllers/customers.controller.js";

const router = express.Router();

router.post("/customers", validateCustomerData, createCustomer);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.put("/customers/:id", validateCustomerData, updateCustomer);

export default router;
