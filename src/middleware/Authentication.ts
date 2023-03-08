import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/index.js";
import ICustomRequest from "../types/ICustomRequest.js";
import IJwtPayload from "../types/IJwtPayload.js";

const Authentication = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authentication invalid");
  }

  const token = authHeader.split(" ")?.[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as IJwtPayload;

    req.user = { userId: payload?.userId, name: payload?.name };
  } catch (error) {
    throw new UnauthorizedError("Authentication invalid");
  }

  next();
};

export default Authentication;
