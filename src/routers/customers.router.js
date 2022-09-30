import express from "express";
import { createCustomer } from "../controllers/customers.controller.js";
import { validateCustomerData } from "../middlewares/schemas.middleware.js";

const router = express.Router();

router.post("/customers", validateCustomerData, createCustomer);

export default router;
