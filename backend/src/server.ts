import app from "./app";
import "dotenv/config";
import mongoose from "mongoose";

const port = process.env.PORT || 5140;

mongoose
  .connect(process.env.DATABASE!)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port} 😀`);
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
