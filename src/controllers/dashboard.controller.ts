import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {

    constructor(private dashboardService: DashboardService) {}

    public index = async (_: Request, res: Response) => {
        res.render('dashboard/index');
    };

    public findFolders = async (_: Request, res: Response) => {
        res.json({
            folders: await this.dashboardService.findFolders()
        });
    };

    public deleteFolder = async (req: Request, res: Response) => {
        res.json({
            res: await this.dashboardService.deleteFolder(req.params.id)
        });
    };

    public findSurveys = async (_: Request, res: Response) => {
        res.json({
            surveys: await this.dashboardService.findSurveys()
        });
    };

    public show = async (req: Request, res: Response) => {

        const { page = 1, limit = 25 } = req.query;

        res.render('dashboard/survey', 
            await this.dashboardService.findResponses(req.params.id, Number(page), Number(limit))
        );
    };


}