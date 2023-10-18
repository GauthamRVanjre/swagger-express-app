import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["todo", "done"],
    default: "todo",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Todo = mongoose.model("TODO", todoSchema);
