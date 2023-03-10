import { Document } from "mongoose";

export interface IUser extends Document {
    apiKey: string;
    isSuperAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}