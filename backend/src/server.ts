import "dotenv/config";
import env from "./utils/validateEnv";
import mongoose from "mongoose";
import app from "./app";

const port = env.PORT || 5000;

mongoose
  .connect(env.DATABASE)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port} 😀!`);
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
