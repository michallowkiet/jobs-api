import { Router } from "express";
const JobsRouter = Router();
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  jobsStats,
} from "../controllers/JobsController.js";

JobsRouter.route("/").post(createJob).get(getAllJobs).get(jobsStats);
JobsRouter.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

export default JobsRouter;
