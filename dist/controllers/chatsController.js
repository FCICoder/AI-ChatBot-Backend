import userModel from "../models/userModel.js";
import { OpenAIApi } from 'openai';
import { configureOpenAi } from "../config/openAi-config.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await userModel.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or Token is invalid" });
        }
        // Limit chat history to the last 10 messages to reduce token usage
        const recentChats = user.chats.slice(-10).map((chat) => ({
            role: chat.role,
            content: chat.content,
        }));
        recentChats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        const config = configureOpenAi();
        const openAi = new OpenAIApi(config);
        try {
            const chatResponse = await openAi.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: recentChats,
            });
            user.chats.push({ content: chatResponse.data.choices[0].message.content, role: "assistant" });
            await user.save();
            return res.status(200).json({ chats: user.chats });
        }
        catch (apiError) {
            if (apiError.response?.status === 429) {
                return res.status(429).json({ message: "Quota exceeded. Please try again later." });
            }
            throw apiError;
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Server Error" });
    }
};
//# sourceMappingURL=chatsController.js.map