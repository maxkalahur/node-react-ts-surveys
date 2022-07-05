import { Document } from "mongoose";
import { ISurvey } from "./survey.interface";
import { IResponder } from "./responder.interface";

export interface IResponse extends Document {
    survey: ISurvey;
    responder: IResponder;
    deviceType: string;
    browserType: string;
    score: number;
    why: string;
    provider: string;
    name: string;
    isContactMe: boolean;
    email: string;
    phone: string;
    isActive: boolean;
    isCompleted: boolean;
    completedAt: Date;
    status: 'Opened' | 'Started' | 'Completed';
    createdAt: Date;
    updatedAt: Date;
}