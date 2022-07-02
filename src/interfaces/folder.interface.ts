import { Document } from "mongoose";

export interface IFolder extends Document {
    name: string;
    isActive: boolean;
    organizationId: number;
}