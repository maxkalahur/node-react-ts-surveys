import { Document } from "mongoose";
import { ISurvey } from "./survey.interface";

export interface IResponder extends Document {
    email: string;
    survey: ISurvey;
    promoterId: number;
    ehrPlatform: string;
    createdAt: Date;
    updatedAt: Date;
}