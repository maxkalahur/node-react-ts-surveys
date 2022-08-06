import { Survey, Response, Responder, QuestionItem } from './';
import {createContext} from 'react';

export interface AppContext {
    isPreview: boolean,
    survey: Survey,
    response: Response,
    responder: Responder,
    questionsList: QuestionItem[],
    questionFlows: string[][],
};

export const AppCtx = createContext<AppContext | null>(null);