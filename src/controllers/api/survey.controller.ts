import { Request, Response } from "express";
import { ApiSurveyService } from "../../services/api/survey.service";

export class ApiSurveyController {

    constructor(private surveyService: ApiSurveyService) {
    }

    
}