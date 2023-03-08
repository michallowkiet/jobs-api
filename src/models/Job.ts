import mongoose, { Schema } from "mongoose";
import IJob, { JobStatusType, JobType } from "../types/IJob.js";

const JobSchema = new mongoose.Schema<IJob>(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      max: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      max: 100,
    },
    status: {
      type: String,
      enum: JobStatusType,
      default: JobStatusType.PENDING,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    jobType: {
      type: String,
      enum: JobType,
      default: JobType.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "",
      required: [true, "Please provide job location."],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

export default Job;
