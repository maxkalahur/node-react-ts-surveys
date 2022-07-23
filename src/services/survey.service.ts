import { ISurvey } from "../interfaces/survey.interface";
import { Survey } from "../models/survey.model";

export class SurveyService {

    public async getSurvey(surveyType: string, surveyId: string, preview: boolean): Promise<ISurvey> {
        
        const survey = await Survey.findOne({ code: surveyId }).exec();

        if ( !survey ) {
            throw new Error(`Survey with id '${surveyId}' not found`);
        }
        return survey;
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