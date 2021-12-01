import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

export const Task = mongoose.model("task", taskSchema);
