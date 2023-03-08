import { Request } from "express";

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
