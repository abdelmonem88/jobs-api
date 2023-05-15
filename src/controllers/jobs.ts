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

export const updateJob = async (req: CustomRequest, res: Response) => {
  const { id: jobId } = req.params;
  const { userId } = req.user as JwtPayload;

  if (!req.body.company || !req.body.position) {
    throw new BadRequestError("Please provide company and position");
  }
  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req: CustomRequest, res: Response) => {
  const { id: jobId } = req.params;
  const { userId } = req.user as JwtPayload;
  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
