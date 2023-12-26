import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      required: true,
      default: false,
    },
    important: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = models?.Task || model("Task", taskSchema);

export default Task;
