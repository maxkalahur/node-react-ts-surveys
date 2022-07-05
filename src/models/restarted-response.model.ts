import { IRestartedResponse } from "../interfaces/restarted-response.interface";
import { model, Schema } from "mongoose";

const RestartedResponseSchema = new Schema({
        response: { type: Schema.Types.ObjectId, ref: 'Response', index: true, required: [true, "Field is required"] },
        score: { type: Number },
        why: { type: String },
        provider: { type: String },
        name: { type: String },
        isContactMe: { type: Boolean },
        email: { type: String },
        phone: { type: String },
    },
    { versionKey: false, timestamps: true }
);

export const RestartedResponse = model<IRestartedResponse>("RestartedResponse", RestartedResponseSchema);