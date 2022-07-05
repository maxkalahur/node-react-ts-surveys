import { TDashboardSurveyItem } from "../types/dashboard/survey.type";
import { IFolder } from "../interfaces/folder.interface";
import { Survey } from "../models/survey.model";
import { Folder } from "../models/folder.model";
import { Response } from "../models/response.model";
import date from 'date-and-time';
import config from '../config';

export class DashboardService {

    public findFolders(): Promise<IFolder[]> {
        return Folder.find({})
                    .sort({name: 1})
                    .exec();
    }

    public async findSurveys(): Promise<TDashboardSurveyItem[]> {

        const surveys = await Survey.find({})
                                    .populate( { path: 'folder', match: {} } )
                                    .exec();

        const promises = surveys.map(async v => {
            
            const lastResponse = await Response.findOne({ isCompleted: true, survey: v })
                                                .populate('survey')
                                                .sort({createdAt: -1})
                                                .exec();

            const amountOfResponses = await Response.countDocuments({ isCompleted: true, survey: v });

            const surveyItem: TDashboardSurveyItem = {
                id: v.id,
                title: v.title,
                link: config.app.domain + '/s/' + v.code,
                organizationName: v.folder.name,
                organizationId: v.folder.id,
                amountOfResponses: amountOfResponses,
                isMultipleProviders: v.isMultipleProviders,
                isContactPageOff: v.isContactPageOff,
                lastResponseDateAt: lastResponse ? date.format(lastResponse.completedAt, 'D MMMM, YYYY') : null,
                updatedAt: date.format(v.updatedAt, 'D MMMM, YYYY'),
            }

            return surveyItem;
        });

        const res = await Promise.all(promises);

        return res;
    }
    
}