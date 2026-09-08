import express from "express";
import "dotenv/config";
import { userRoute } from "./routes/userrouter";
import cookieParser from "cookie-parser";
import { conversationRouter } from "./routes/conversationrouter";
import { Sandbox } from "e2b";
const app = express();
async function main() {
  const sandbox = await Sandbox.create("react-template", {
    timeoutMs: 120_000,
    apiKey: process.env.E2B_KEY,
  });
  const host = sandbox.getHost(5173);
  console.log(host);
  setTimeout(async () => {
    await sandbox.kill();
  }, 1000 * 130);
}
main();
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/conversation", conversationRouter);
app.listen(3000, () => {
  console.log("listening on port 3000");
});
