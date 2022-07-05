import { IFolder } from "./folder.interface";
import { Document } from "mongoose";

export interface ISurvey extends Document {
    title: string;
    locationId: number;
    folder: IFolder;
    isActive: boolean;
    isMultipleProviders: boolean;
    isContactPageOff: boolean;
    requestContactName: string;
    requestContactEmail: string;
    code: string;
    isLanguageForMedspaOff: boolean;
    createdAt: Date;
    updatedAt: Date;
}