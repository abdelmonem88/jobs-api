import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

import Job from "../models/Job";
import { BadRequestError, NotFoundError } from "../errors";
import { CustomRequest } from "../middleware/authentication";

export const getJobs = async (req: Request, res: Response) => {
  res.send("jobs route");
};

export const getJob = async (req: Request, res: Response) => {
  res.send("job route");
};

export const createJob = async (req: CustomRequest, res: Response) => {
  req.body.createdBy = (req.user as JwtPayload).userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req: Request, res: Response) => {
  res.send("update job route");
};

export const deleteJob = async (req: Request, res: Response) => {
  res.send("delete job route");
};
