import { Router } from "express";
const JobsRouter = Router();
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/JobsController.js";

JobsRouter.route("/").post(createJob).get(getAllJobs);
JobsRouter.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

export default JobsRouter;
