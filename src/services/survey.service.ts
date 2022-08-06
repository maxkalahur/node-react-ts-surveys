import { ISurvey } from "../interfaces/survey.interface";
import { Responder } from "../models/responder.model";
import { Survey } from "../models/survey.model";
import { PromoterApiService } from "../services/api/promoter-api.service";

import { AppContext, Doctor } from '../assets/js/survey/src/interfaces/index';

export class SurveyService {

    constructor(private promoterApiService: PromoterApiService) {}

    public async getSurvey(surveyType: string, surveyId: string, preview: boolean): Promise<AppContext> {
        
        let responseData = null;

        const questionFlows = [
            ['Question','Providers','Name','ContactMe','Contacts','ThankYou'],     // Detractor Flow, score 1-6
            ['Question','Providers','Name','ThankYou'],                            // Passive Flow, score 7-8
            ['Providers','ThankYouPromoter'],                                      // Promoter Flow, score 9-10
        ];

        if( surveyType === 's' ) {
            const survey = await Survey.findOne({ code: surveyId }).exec();
        }
        else if( surveyType === 'i' ) {

            const responder = await Responder.findOne({ promoterId: surveyId })
                                    .populate('survey')
                                    .populate('response')
                                    .exec();
                                    
            if( responder ) {
                const survey = responder.survey;
                const response = responder.response;

                const promoterSurveyData = await this.promoterApiService.call('/get-survey-data', { 
                    loc_id: survey.locationId,
                    is_multiple_providers: survey.isMultipleProviders,
                    contact_survey_id: responder.promoterId,
                });
                const surveyData = {...survey,
                    id: survey.id,
                    logoUrl: promoterSurveyData.logo_url,
                    isMedspaOff: promoterSurveyData.is_medspa_off,
                    location: { 
                        googleReviewUrl: promoterSurveyData.google_review_url,
                        facebookReviewUrl: promoterSurveyData.facebook_review_url,
                        healthgradesReviewUrl: promoterSurveyData.healthgrades_review_url,
                    },
                    doctors: promoterSurveyData.doctors,
                };

                responseData = {
                    isPreview: preview,
                    survey: surveyData,
                    response: response,
                    responder: responder,
                    questionsList: [], 
                    questionFlows: questionFlows
                };
            }
        }

        if( responseData ) {
            return responseData;
        }
        else {
            throw new Error;
        }
    }

    // public getWelcomeMessage() {
    //     return 'Welcome to pokeAPI REST by Nya ^^';
    // }

    // public findAll(): Promise<ISurvey[]> {
    //     return Survey.find({}).exec();
    // }

    // public add(survey: ISurvey): Promise<ISurvey> {
    //     const newSurvey = new Survey(survey);
    //     return newSurvey.save();
    // }

    // public async delete(id: string): Promise<ISurvey> {
        
    //     const deletedSurvey = await Survey.findByIdAndDelete(
    //         id
    //     ).exec();
    
    //     if (!deletedSurvey) {
    //         throw new Error(`Survey with id '${id}' not found`);
    //     }
    
    //     return deletedSurvey;
    // }

    public async update(id: string, survey: ISurvey): Promise<ISurvey> {

        const updatedSurvey = await Survey.findByIdAndUpdate(
            id,
            survey, 
            {new: true}
        ).exec();
    
        if (!updatedSurvey) {
            throw new Error(`Survey with id '${id}' not found`);
        }
    
        return updatedSurvey;
    }
    
}