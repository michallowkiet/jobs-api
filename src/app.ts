import dotenv from "dotenv";
import "express-async-errors";

//extra security packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";
import yaml from "yaml";

import fs from "fs";
import swaggerUi from "swagger-ui-express";
import express from "express";

import connectDB from "./db/ConnectDb.js";
import Authentication from "./middleware/Authentication.js";

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
