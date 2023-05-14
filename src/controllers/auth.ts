import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";

import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = await User.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name }, token: user.generateToken() });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide an email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isMatchPassword = await user.comparePassword(password);
  console.log(isMatchPassword);

  if (!isMatchPassword) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.generateToken();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
    },
    token,
  });
};
