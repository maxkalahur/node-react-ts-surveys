import { Document } from "mongoose";

export interface IResponse extends Document {
    surveyId: number;
    responderId: number;
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
}