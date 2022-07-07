import { TDashboardSurveyItem } from "../types/dashboard/survey.type";
import { TDashboardResponseItem } from "../types/dashboard/response.type";
import { IFolder } from "../interfaces/folder.interface";
import { ISurvey } from "../interfaces/survey.interface";
import { IResponse } from "../interfaces/response.interface";
import { Survey } from "../models/survey.model";
import { Folder } from "../models/folder.model";
import { Response } from "../models/response.model";
import date from 'date-and-time';
import config from '../config';
import internal from "stream";

export class DashboardService {

    public findFolders(): Promise<IFolder[]> {
        return Folder.find({})
                    .sort({name: 1})
                    .exec();
    }

    public async findSurveys(): Promise<TDashboardSurveyItem[]> {

        const surveys = await Survey.find({})
                                    .populate('folder')
                                    .exec();

        const promises = surveys.map(async v => {
            
            const lastResponse = await Response.findOne({ isCompleted: true, survey: v })
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
    
    public async findResponses( surveyId: string, page: number, limit: number )
                    : Promise<{ survey:ISurvey, responses:TDashboardResponseItem[], totalPages: number, page: number }> {

        const survey = await Survey.findById(surveyId);

        if( !survey ) {
            throw Error;
        }

        const responsesOrigin = await Response.find({ survey: survey })
                                    .limit(limit * 1)
                                    .skip((page - 1) * limit)
                                    .sort({ createdAt: -1 })
                                    .exec();

        const responses:TDashboardResponseItem[] = responsesOrigin.map(v => ({
                                        id: v.id, 
                                        deviceType: v.deviceType, 
                                        browserType: v.browserType, 
                                        score: v.score, 
                                        why: v.why, 
                                        provider: v.provider, 
                                        name: v.name, 
                                        email: v.email, 
                                        phone: v.phone, 
                                        createdAtFormatted: date.format(v.createdAt, 'D MMMM, YYYY'), 
                                        updatedAtFormatted: date.format(v.updatedAt, 'D MMMM, YYYY'),
                                        statusFormatted: v.status + (v.isActive) ? '' : (`archived`),
                                        isContactMeFormatted: v.isContactMe ? 'Yes' : 'No',
                                    }));
                                    
        const count = await Response.countDocuments({ survey: survey });
        const totalPages = Math.ceil(count / limit);

        return { survey, responses, totalPages, page };
    }

}