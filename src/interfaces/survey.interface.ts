import { Document } from "mongoose";

export interface ISurvey extends Document {
  name: string;
  weight: number;
}