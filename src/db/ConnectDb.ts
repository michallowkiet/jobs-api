import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = (url: string) => mongoose.connect(url);

export default connectDB;
