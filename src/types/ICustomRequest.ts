import { Request } from "express";
import { JobStatusType, JobType, SortType } from "./IJob.js";

interface ICustomRequest extends Request {
  user: {
    userId: string;
    name: string;
  };

  params: {
    id: string;
  };
}

interface ICustomRequestJobs extends ICustomRequest {
  body: {
    company: string;
    position: string;
    createdBy?: string;
  };

  query: {
    search: string;
    status: JobStatusType;
    jobType: JobType;
    sort: SortType;
    page?: string;
    limit?: string;
  };
}

interface ICustomRequestUsers extends ICustomRequest {
  body: {
    name: string;
    lastName: string;
    location: string;
    email: string;
  };
}

export { ICustomRequest, ICustomRequestJobs, ICustomRequestUsers };
