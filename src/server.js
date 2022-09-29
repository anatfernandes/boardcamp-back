import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.get("/status", (req, res) => {
	res.sendStatus(200);
});

server.listen(4000, () => console.log("Listening on port 4000..."));
