import { IResponse } from "../interfaces/response.interface";
import { model, Schema } from "mongoose";

const ResponseSchema = new Schema({
        survey: { type: Schema.Types.ObjectId, ref: 'Survey', index: true, required: [true, "Field is required"] },
        responder: { type: Schema.Types.ObjectId, ref: 'Responder', index: true, required: [true, "Field is required"] },
        deviceType: { type: String, required: [true, "Field is required"] },
        browserType: { type: String, required: [true, "Field is required"] },
        score: { type: Number },
        why: { type: String },
        provider: { type: String },
        name: { type: String },
        isContactMe: { type: Boolean },
        email: { type: String },
        phone: { type: String },
        isActive: { type: Boolean, default: true },
        isCompleted: { type: Boolean, default: false, index: true },
        completedAt:  { type: Date },
        status: { type: ['Opened', 'Started', 'Completed'] }
    },
    { versionKey: false, timestamps: true }
);

export const Response = model<IResponse>("Response", ResponseSchema);