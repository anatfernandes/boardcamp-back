import express from "express";
import { createGame } from "../controllers/games.controller.js";

const router = express.Router();

router.post("/games", createGame);

export default router;
