import User from "../models/User.js";
import { BadRequestError, UnauthorizedError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      token,
    },
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthorizedError("Invalid credentials.");
  }

  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid credentials.");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      token,
    },
  });
};

export { register, login };
