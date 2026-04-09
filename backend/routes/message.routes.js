import express from "express";
import { getMessages, saveMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:roomId", getMessages);
router.post("/room", saveMessage);

export default router;
