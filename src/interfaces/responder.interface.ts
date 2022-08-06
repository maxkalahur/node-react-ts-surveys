import { Document } from "mongoose";
import { ISurvey } from "./survey.interface";
import { IResponse } from "./response.interface";

export interface IResponder extends Document {
    email: string;
    survey: ISurvey;
    response: IResponse;
    promoterId: number;
    ehrPlatform: string;
    createdAt: Date;
    updatedAt: Date;
}