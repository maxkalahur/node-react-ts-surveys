import { IResponder } from "../interfaces/responder.interface";
import { model, Schema } from "mongoose";

const ResponderSchema = new Schema({
        email: { type: String, index: true },
        survey: { type: Schema.Types.ObjectId, ref: 'Survey', index: true, required: [true, "Field is required"] },
        response: { type: Schema.Types.ObjectId, ref: 'Response', index: true },
        promoterId: { type: String, index: true },
        ehrPlatform: { type: String },
    },
    { versionKey: false, timestamps: true }
);

export const Responder = model<IResponder>("Responder", ResponderSchema);