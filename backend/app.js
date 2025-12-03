import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import connectToDB from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import sessionMiddleware from './middleware/session.middleware.js';
import cityRouter from './routes/city.route.js';

const app = express();

app.set("trust proxy", true);

const corsOptions ={
  origin:['http://localhost:5173'],
  credentials:true,
  optionSuccessStatus:200,
}

// Builtin Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);
app.use(sessionMiddleware);

// Register API routes (v1)
// Each router handles its own feature module
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cities', cityRouter);

// Importing error middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the City Pulse API!");
});

app.listen(PORT, async () => {
  console.log(`City Pulse is running on port http://localhost:${PORT}`);

  //connect to database
  await connectToDB();
});

export default app;