import type { Request, Response } from "express";
import { createSandbox, pauseSandbox } from "../e2b/createSandbox";
export async function createConversation(req: Request, res: Response) {
  const userId = req.userId;
  const { host, sandboxId } = await createSandbox();
  const paused = await pauseSandbox(sandboxId);
  //insert into db
  res.json({ userId: userId, host: host, sandboxId });
}
export async function getConversationMessages(req: Request, res: Response) {}
export async function sendMessageToConversation(req: Request, res: Response) {}
