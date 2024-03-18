import { Document } from "mongoose";

export declare interface ITodo extends Document {
  id: string;
  name: string;
  description: string;
  priority_level: string;
  status: string;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  user: string;
}
