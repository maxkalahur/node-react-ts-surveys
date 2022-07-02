import { ISurvey } from "../interfaces/survey.interface";
import { model, Schema } from "mongoose";

const SurveySchema = new Schema({
        title: { type: String, required: [true, "Field is required"] },
        locationId: { type: Number, unique: true, required: [true, "Field is required"] },
        folderId: { type: Number, index: true, required: [true, "Field is required"] },
        isActive: { type: Boolean, default: true },
        isMultipleProviders: { type: Boolean, default: false },
        isContactPageOff: { type: Boolean, default: false },
        requestContactName: { type: String },
        requestContactEmail: { type: String },
        code: { type: String, unique: true, required: [true, "Field is required"] },
        isLanguageForMedspaOff: { type: Boolean, default: false }
    },
    { versionKey: false, timestamps: true }
);

export const Survey = model<ISurvey>("Survey", SurveySchema);