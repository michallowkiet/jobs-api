import { Types } from "mongoose";

interface IJob {
  company: string;
  position: string;
  status: string;
  createdBy: Types.ObjectId;
}

export default IJob;
