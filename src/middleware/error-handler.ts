import { CustomAPIError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = (
  err: { statusCode: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.statusCode != 500) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

export default errorHandlerMiddleware;
