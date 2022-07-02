import { Document } from "mongoose";

export interface ISurvey extends Document {
    title: string;
    locationId: number;
    folderId: number;
    isActive: boolean;
    isMultipleProviders: boolean;
    isContactPageOff: boolean;
    requestContactName: string;
    requestContactEmail: string;
    code: string;
    isLanguageForMedspaOff: boolean;
}