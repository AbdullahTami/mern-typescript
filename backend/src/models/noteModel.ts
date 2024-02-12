import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: [true, "A note must have a title!"],
    },
    text: String,
  },
  { timestamps: true }
);

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
