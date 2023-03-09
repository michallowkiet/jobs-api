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
import TestUserHandler from "../middleware/TestUserHandler.js";

JobsRouter.route("/")
  .post(TestUserHandler, createJob)
  .get(getAllJobs)
  .get(jobsStats);
JobsRouter.route("/:id")
  .get(getJob)
  .delete(TestUserHandler, deleteJob)
  .patch(TestUserHandler, updateJob);

export default JobsRouter;
