import { NextFunction, Response } from "express";
import { BadRequestError } from "../errors/index.js";
import { ICustomRequest } from "../types/ICustomRequest.js";

const TestUserHandler = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.body.testUser) {
    throw new BadRequestError("Test User. Read Only!");
  }

  next();
};

export default TestUserHandler;
