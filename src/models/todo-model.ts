import mongoose from "mongoose";
import { ITodo } from "../constants/interfaces";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Task must have a name"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    priority_level: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["completed", "ongoing", "pending"],
      default: "ongoing",
    },
    start_date: {
      type: Date,
      default: Date.now(),
      required: [true, "Start date is required"],
    },
    end_date: {
      type: Date,
    },
    user: {
      type: String,
      required: [true, "Task must belong to a user"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model<ITodo>("Todo", schema);
