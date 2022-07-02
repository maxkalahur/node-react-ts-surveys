import { Document } from "mongoose";

export interface IRestartedResponse extends Document {
    responseId: number;
    score: number;
    why: string;
    provider: string;
    name: string;
    isContactMe: boolean;
    email: string;
    phone: string;
}