import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel.js";
import { configureOpenAi } from "../config/openAi-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try{
    const user = await userModel.findById(res.locals.jwtData.id);
  if (!user)
    return res
      .status(401)
      .json({ message: "user not registered or Token is invalid" });

  //? grap chats of the user
  const chats = user.chats?.map((role, content) => ({
    role,
    content,
  })) as ChatCompletionRequestMessage[];
  chats.push({ content: message, role: "user" });
  user.chats.push({ content: message, role: "user" });

  //? send all the chat with a new one to openAi
  const config = configureOpenAi();
  const openAi = new OpenAIApi(config);
  
  //? get the latest response
  const chatResponse = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: chats,
  });
  user.chats.push(chatResponse.data.choices[0].message);
  await user.save();

  return res.status(200).json({chats: user.chats});
  }catch(err){
    console.log(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
