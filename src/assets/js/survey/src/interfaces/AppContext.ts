import { Survey, Response, Responder, Doctor, QuestionItem } from './';
import {createContext} from 'react';

export interface AppContext {
    isPreview: boolean,
    survey: Survey,
    response: Response,
    responder: Responder,
    doctors: Doctor[],
    questionsList: QuestionItem[],
    questionFlows: [
        ['Question','Providers','Name','ContactMe','Contacts','ThankYou'],     // Detractor Flow, score 1-6
        ['Question','Providers','Name','ThankYou'],                            // Passive Flow, score 7-8
        ['Providers','ThankYouPromoter'],                                      // Promoter Flow, score 9-10
    ],
};

export const AppCtx = createContext<AppContext | null>(null);