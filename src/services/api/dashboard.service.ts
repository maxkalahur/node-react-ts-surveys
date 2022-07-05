import { IFolder } from "../../interfaces/folder.interface";
import { ISurvey } from "../../interfaces/survey.interface";
import { Folder } from "../../models/folder.model";
import { Survey } from "../../models/survey.model";
import { TCheckAdminUserResponse } from "../../types/promoter-api-responses/check-admin-user-response.type";
import config from "../../config";
import axios from 'axios';

export class ApiDashboardService {

    public findFolders(): Promise<IFolder[]> {
        return Folder.find({}).exec();
    }

    public findSurveys(): Promise<ISurvey[]> {
        return Survey.find({}).exec();
    }


}