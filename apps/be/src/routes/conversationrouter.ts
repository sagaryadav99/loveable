import Route from "express";
export const conversationRouter = Route();
conversationRouter.post("/create", createConversation);
conversationRouter.get("/:id", getConversationMessages);
conversationRouter.post("/:id/message", sendMessageToConversation);
