import express from "express";
import morgan from "morgan";
import globalAppError from "./utils/globalAppError";
import noteRouter from "./routes/notesRouter";
import userRouter from "./routes/userRouter";
import createHttpError from "http-errors";
import env from "./utils/validateEnv";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.DATABASE,
    }),
  })
);

// Routes
app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);

// Unknown endpoint
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found ⛔"));
});

// Global error handler
app.use(globalAppError);

export default app;
