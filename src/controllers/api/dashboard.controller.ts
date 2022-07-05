import { Request, Response } from "express";
import { ApiDashboardService } from "../../services/api/dashboard.service";

export class ApiDashboardController {

    constructor(private apiDashboardService: ApiDashboardService) {
    }

    public findFolders = async (_: Request, res: Response) => {
        try {
            const folders = await this.apiDashboardService.findFolders();
            res.send(folders);
        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send(e!.message);
            }
            else {
                
            }
        }
    };

    public findSurveys = async (_: Request, res: Response) => {
        try {
            const surveys = await this.apiDashboardService.findSurveys();
            res.send(surveys);
        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send(e!.message);
            }
            else {
                
            }
        }
    };
    
}