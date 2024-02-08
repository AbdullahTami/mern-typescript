import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  DATABASE: str(),
  PORT: port(),
});
