import { IFolder } from "../interfaces/folder.interface";
import { model, Schema } from "mongoose";

const FolderSchema = new Schema({
        name: { type: String, required: [true, "Field is required"] },
        oraganizationId: { type: Number, unique: true, required: [true, "Field is required"] },
        isActive: { type: Boolean, default: true },
    },
    { versionKey: false, timestamps: true }
);

export const Folder = model<IFolder>("Folder", FolderSchema);