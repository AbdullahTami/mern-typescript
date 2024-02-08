import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
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
// const Booking = mongoose.model('Booking', bookingSchema);
