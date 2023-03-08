import { Types } from "mongoose";

export enum JobType {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  REMOTE = "remote",
  INTERNSHIP = "internship",
}

export enum JobStatusType {
  INTERVIEW = "interview",
  DECLINED = "declined",
  PENDING = "pending",
}
interface IJob {
  company: string;
  position: string;
  status: JobStatusType;
  createdBy: Types.ObjectId;
  jobType: JobType;
  jobLocation: string;
}

export default IJob;
