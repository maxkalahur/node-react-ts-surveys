import { Request, Response } from "express";
import { SurveysService } from "../services/surveys.service";

export class SurveysController {

    constructor(private surveysService: SurveysService) {
    }

    public sayHello = (_: Request, res: Response) => {
        const welcomeMessage = this.surveysService.getWelcomeMessage();
        res.render('index');
    };

    public findAll = async (_: Request, res: Response) => {
        try {
            const surveys = await this.surveysService.findAll();
            res.send(surveys);
        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send(e!.message);
            }
            else {
                
            }
        }
    };

    public add = async (req: Request, res: Response) => {
        try {
            const addSurveyResult = await this.surveysService.add(req.body);
            res.send(addSurveyResult);
        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send(e.message);
            }
            else {
                
            }
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const deleteSurveyResult = await this.surveysService.delete(
                req.params.id
            );
            res.send(deleteSurveyResult);
        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send(e.message);
            }
            else {
                
            }
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const updateSurveyResult = await this.surveysService.update(
                req.params.id,
                req.body
            );
            res.send(updateSurveyResult);
        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send(e.message);
            }
            else {
                
            }
        }
    };
}