import dotenv from "dotenv";
import connectDB from "../ConnectDb.js";
import Job from "../../models/Job.js";
import { data } from "./mockData.js";

dotenv.config();

const populateDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.deleteMany();
    await Job.create(data);
    console.log("Database was populated.");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populateDB();
