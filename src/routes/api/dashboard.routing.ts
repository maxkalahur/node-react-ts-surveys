import { Router } from "express";
import { ApiDashboardController } from "../../controllers/api/dashboard.controller";
import { ApiDashboardService } from "../../services/api/dashboard.service";

export class ApiDashboardRouting {
    public router = Router();
    private apiDashboardController = new ApiDashboardController(new ApiDashboardService());
    
    constructor() {
        this.setRoutes();
    }

    public setRoutes() {
        
        this.router.route("/folders.json").get(this.apiDashboardController.findFolders);
        this.router.route("/surveys.json").get(this.apiDashboardController.findSurveys);
    }

}