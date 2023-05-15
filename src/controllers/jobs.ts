import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

import Job from "../models/Job";
import { BadRequestError, NotFoundError } from "../errors";
import { CustomRequest } from "../middleware/authentication";

export const getJobs = async (req: CustomRequest, res: Response) => {
  const jobs = await Job.find({ createdBy: (req.user as JwtPayload).userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const getJob = async (req: CustomRequest, res: Response) => {
  const { id: jobId } = req.params;
  const { userId } = req.user as JwtPayload;
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
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
