import Express from "express";

import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs";

const jobRoutes = Express.Router();

jobRoutes.get("/", getJobs);
jobRoutes.get("/:id", getJob);
jobRoutes.post("/", createJob);
jobRoutes.put("/:id", updateJob);
jobRoutes.delete("/:id", deleteJob);

export default jobRoutes;
