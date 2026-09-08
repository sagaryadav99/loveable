import { userZod } from "@loveable/shared";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function userSignupController(req: Request, res: Response) {
  const parsed = userZod.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "wrong inputs" });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { username: parsed.data.username },
    });
    if (existingUser) {
      return res.status(409).json({ message: "user already exists" });
    }
    const hashedpassword = await bcrypt.hash(parsed.data.password, 4);
    await prisma.user.create({
      data: { username: parsed.data.username, password: hashedpassword },
    });
    res.json({ message: "user created successfully" });
  } catch (e) {
    console.log(e);
  }
}
export async function userSigninController(req: Request, res: Response) {
  const parsed = userZod.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "inputs not valid" });
  }
  const { username, password } = parsed.data;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "user not found, please signup first" });
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({ message: "wrong password entered" });
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.json({ message: "signed in successfully" });
  } catch (e) {
    console.log(e);
  }
}
