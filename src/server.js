import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoriesRouter from "./routers/categories.router.js";
import gamesRouter from "./routers/games.router.js";
import customersRouter from "./routers/customers.router.js";
import rentalsRouter from "./routers/rentals.router.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use(categoriesRouter);
server.use(gamesRouter);
server.use(customersRouter);
server.use(rentalsRouter);

server.get("/status", (req, res) => {
	res.sendStatus(200);
});

server.listen(4000, () => console.log("Listening on port 4000..."));
