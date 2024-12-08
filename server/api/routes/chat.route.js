import express from 'express';
import { handleChat } from '../controller/chat.controller.js'; // Import controller functions

const router = express.Router();

// Define route for chatting with the bot
router.post('/', handleChat);

export default router; // Export router using ES Module syntax
