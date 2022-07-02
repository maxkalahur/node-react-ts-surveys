import { Document } from "mongoose";

export interface IResponder extends Document {
    email: string;
    surveyId: number;
    promoterId: number;
    ehrPlatform: string;
}