import React, { useContext } from "react";
import { AppCtx } from '../interfaces';
import { ContactMe, Contacts, Name, Providers, Question, ThankYou, ThankYouPromoter } from './survey-steps';

export default function QuestionItem() {

    const appContext = useContext(AppCtx)!;
    const activeQuestion = appContext.questionsList.find(item => item.isActive)!;
    const questionItems = {
        ContactMe: ContactMe,
        Contacts: Contacts,
        Name: Name,
        Providers: Providers,
        Question: Question,
        ThankYou: ThankYou,
        ThankYouPromoter: ThankYouPromoter,
    };
    const ActiveQuestionType = questionItems[activeQuestion.componentName];

    if( activeQuestion ) {
        return (
            <ActiveQuestionType />
        );
    }
    else {
        return null;
    }
}   