import { Router } from "express";
import { SurveysController } from "../controllers/surveys.controller";
import { SurveysService } from "../services/surveys.service";

export class DashboardRouting {
    public router = Router();
    private surveysController = new SurveysController(new SurveysService());
    
    constructor() {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").get(this.surveysController.sayHello).post(this.surveysController.add);
        this.router.route("/all").get(this.surveysController.findAll);
        this.router.route("/:id").delete(this.surveysController.delete).put(this.surveysController.update);
    }

}