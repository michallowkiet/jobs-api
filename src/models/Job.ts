import mongoose, { Schema } from "mongoose";
import IJob from "../types/IJob.js";

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
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

export default Job;
