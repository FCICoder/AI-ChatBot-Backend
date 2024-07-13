import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chatsController.js";
//! protected routes 
const chatRoute = Router();
chatRoute.post('/new', validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoute.get('/all-chats', verifyToken, sendChatsToUser);
chatRoute.delete('/delete', verifyToken, deleteChats);
export default chatRoute;
//# sourceMappingURL=chatRoute.js.map