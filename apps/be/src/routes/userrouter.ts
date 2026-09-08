import Route from "express";
import {
  userSigninController,
  userSignupController,
} from "../controller/usercontroller";
export const userRoute = Route();
userRoute.post("/signup", userSignupController);
userRoute.post("/signin", userSigninController);
