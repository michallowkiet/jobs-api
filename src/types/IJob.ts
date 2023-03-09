import { Types } from "mongoose";

export enum JobType {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  REMOTE = "remote",
  INTERNSHIP = "internship",
  ALL = "all",
}

export enum JobStatusType {
  INTERVIEW = "interview",
  DECLINED = "declined",
  PENDING = "pending",
  ALL = "all",
}

export enum SortType {
  LATEST = "latest",
  OLDEST = "oldest",
  A_Z = "a-z",
  Z_A = "z-a",
}

type regexSearch = { $regex: string; $options: string };
export interface IJobQueryObject {
  createdBy: string;
  status?: JobStatusType;
  jobType?: JobType;
  position?: regexSearch;
  sort?: SortType;
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
