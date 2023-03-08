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
import express, { Request, Response } from "express";

import connectDB from "./db/ConnectDb.js";
import Authentication from "./middleware/Authentication.js";

import AuthRouter from "./routes/AuthRouter.js";
import JobsRouter from "./routes/JobsRouter.js";
import UserRouter from "./routes/UsersRouter.js";

import NotFoundHandler from "./middleware/NotFoundHandler.js";
import ErrorHandler from "./middleware/ErrorHandler.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = fileURLToPath(new URL(".", import.meta.url));

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 request per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

const swaggerFile = fs.readFileSync("./swaggerDoc.yaml", "utf-8");
const swaggerDoc = yaml.parse(swaggerFile);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/jobs", Authentication, JobsRouter);
app.use("/api/v1/users", Authentication, UserRouter);

app.get("*", (req: Request, res: Response) => {
  res.send(path.resolve(__dirname, "../client/build", "index.html"));
});

app.use(NotFoundHandler);
app.use(ErrorHandler);

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
