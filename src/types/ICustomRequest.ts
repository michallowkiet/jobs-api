import { Request } from "express";

interface ICustomRequest extends Request {
  user: {
    userId: string;
    name: string;
  };

  params: {
    id: string;
  };

  body: {
    company: string;
    position: string;
    createdBy?: string;
  };
}

export default ICustomRequest;
