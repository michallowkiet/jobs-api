import User from "../models/User.js";
import { BadRequestError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { ICustomRequestUsers } from "../types/ICustomRequest.js";

const updateUser = async (req: ICustomRequestUsers, res: Response) => {
  const { name, lastName, location, email } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all fields.");
  }

  const user = await User.findById(req.user.userId);

  user.email = email;
  user.name = name;
  user.location = location;
  user.lastName = lastName;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      token,
    },
  });
};

export { updateUser };
