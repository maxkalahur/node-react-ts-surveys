import { ISurvey } from "../interfaces/survey.interface";
import { model, Schema } from "mongoose";

const SurveySchema = new Schema({
        name: { type: String, required: [true, "Field is required"] },
        weight: { type: Number, required: [true, "Field is required"] },
    },
    { versionKey: false }
);

export const Survey = model<ISurvey>("Survey", SurveySchema);