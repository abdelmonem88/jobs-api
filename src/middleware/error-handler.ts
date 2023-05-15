import { CustomAPIError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

interface customizedError {
  statusCode?: number;
  message?: string;
  name?: string;
  code?: number;
  keyValue?: { [key: string]: string };
  errors?: { [key: string]: { message: string } };
  value?: string;
}

const errorHandlerMiddleware = (
  err: customizedError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
