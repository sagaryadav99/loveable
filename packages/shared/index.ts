import { z } from "zod";
export const userZod = z.object({
  username: z.string(),
  password: z.string(),
});
export const jwtToken = z.object({
  userId: z.string(),
});
