import { Router } from "express";
import { SurveyController } from "../controllers/survey.controller";
import { SurveyService } from "../services/survey.service";

export class SurveyRouting {
    public router = Router();
    private surveyController = new SurveyController(new SurveyService());
    
    constructor() {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route(["/s/:id","/i/:id"]).get(this.surveyController.showSurvey);
        this.router.route('/get-survey-data.json').get(this.surveyController.getSurvey);

        
    }

}