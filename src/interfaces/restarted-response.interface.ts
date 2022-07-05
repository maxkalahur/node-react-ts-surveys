import { Document } from "mongoose";
import { IResponse } from "./response.interface";

export interface IRestartedResponse extends Document {
    response: IResponse;
    score: number;
    why: string;
    provider: string;
    name: string;
    isContactMe: boolean;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}