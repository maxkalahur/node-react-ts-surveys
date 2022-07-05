import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { DashboardService } from "../services/dashboard.service";

export class DashboardRouting {
    public router = Router();
    private dashboardController = new DashboardController(new DashboardService());
    
    constructor() {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").get(this.dashboardController.index);
        this.router.route("/:id").get(this.dashboardController.show);
    }

}