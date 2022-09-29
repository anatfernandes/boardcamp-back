import express from "express";
import { createGame, getGames } from "../controllers/games.controller.js";

const router = express.Router();

router.post("/games", createGame);
router.get("/games", getGames);

export default router;
