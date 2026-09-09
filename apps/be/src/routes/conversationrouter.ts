import Route from "express";
import { authmiddleware } from "../middlewares/authmiddleware";
import {
  createConversation,
  getConversationMessages,
  sendMessageToConversation,
} from "../controller/conversationcontroller";
export const conversationRouter = Route();
conversationRouter.post("/create", authmiddleware, createConversation);
conversationRouter.get("/:id", authmiddleware, getConversationMessages);
conversationRouter.post(
  "/:id/message",
  authmiddleware,
  sendMessageToConversation,
);
