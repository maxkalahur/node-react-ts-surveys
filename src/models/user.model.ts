import { IUser } from "../interfaces/user.interface";
import { model, Schema } from "mongoose";

const UserSchema = new Schema({
        apiKey: { type: String, index: true, required: [true, "Field is required"] },
        isSuperAdmin: { type: Boolean, required: [true, "Field is required"] },
    },
    { versionKey: false, timestamps: true }
);

export const User = model<IUser>("User", UserSchema);