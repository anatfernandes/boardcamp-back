import express from "express";
import { createGame, getGames } from "../controllers/games.controller.js";
import { validateGameData } from "../middlewares/game.middleware.js";

const router = express.Router();

router.post("/games", validateGameData, createGame);
router.get("/games", getGames);

export default router;
