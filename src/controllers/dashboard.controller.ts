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

    public show = async (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;

        res.render('dashboard/survey', 
            await this.dashboardService.findResponses(req.params.id, Number(page), Number(limit))
        );
    };


}