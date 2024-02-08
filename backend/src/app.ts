import express from "express";
import morgan from "morgan";
import globalAppError from "./utils/globalAppError";
import noteRouter from "./routes/notesRouter";
import createHttpError from "http-errors";
const app = express();

//Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/notes", noteRouter);

// Unknown endpoint
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found ⛔"));
});

// Global error handler
app.use(globalAppError);

export default app;