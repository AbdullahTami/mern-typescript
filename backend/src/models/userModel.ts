import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "A must have a name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    select: false,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: [true, "Password must be provide"],
    select: false,
  },
});

type Note = InferSchemaType<typeof userSchema>;

export default model<Note>("User", userSchema);
