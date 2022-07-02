import { IResponder } from "../interfaces/responder.interface";
import { model, Schema } from "mongoose";

const ResponderSchema = new Schema({
        email: { type: String, index: true },
        surveyId: { type: Number, index: true, required: [true, "Field is required"] },
        promoterId: { type: String, index: true },
        ehrPlatform: { type: String },
    },
    { versionKey: false, timestamps: true }
);

export const Responder = model<IResponder>("Responder", ResponderSchema);