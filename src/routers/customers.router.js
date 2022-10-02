import express from "express";
import { validateCustomerData } from "../middlewares/customer.middleware.js";
import {
	getCustomers,
	getCustomer,
	createCustomer,
	updateCustomer,
} from "../controllers/customers.controller.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", validateCustomerData,createCustomer);
router.put("/customers/:id", validateCustomerData, updateCustomer);

export default router;
