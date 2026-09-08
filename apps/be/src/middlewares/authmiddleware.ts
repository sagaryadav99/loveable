import { jwtToken } from "@loveable/shared";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export function authmiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "please signin first" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    const parsed = jwtToken.safeParse(verified);
    if (!parsed.success) {
      return res.status(401).json({ message: "signin first" });
    }
    req.userId = parsed.data.userId;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "signin again" });
  }
}
