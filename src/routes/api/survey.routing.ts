import { Router } from "express";
import { ApiSurveyController } from "../../controllers/api/survey.controller";
import { ApiSurveyService } from "../../services/api/survey.service";

export class ApiSurveyRouting {
    public router = Router();
    private surveysController = new ApiSurveyController(new ApiSurveyService());
    
    constructor() {
        this.setRoutes();
    }

    public setRoutes() {
        
    }

}