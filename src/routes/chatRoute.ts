import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chatsController.js";

//! protected routes 
const chatRoute =Router();

chatRoute.post('/new',validate(chatCompletionValidator),verifyToken,generateChatCompletion)

export default chatRoute;