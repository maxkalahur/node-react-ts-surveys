import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {

    constructor(private dashboardService: DashboardService) {
    }

    public index = async (_: Request, res: Response) => {
        res.render('dashboard/index', {
            folders: await this.dashboardService.findFolders(),
            surveys: await this.dashboardService.findSurveys()
        });
    };

    public show = (_: Request, res: Response) => {
        res.render('dashboard/index');
    };


}