import express from "express";
import { userRoute } from "./routes/userrouter";
import cookieParser from "cookie-parser";
import { conversationRouter } from "./routes/conversationrouter";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/conversation", conversationRouter);
app.listen(3000, () => {
  console.log("listening on port 3000");
});
