import { Request, Response, Router } from "express";
import { SurveysService } from "../services/surveys.service";

export class SurveysController {
    public router = Router();
    
    constructor(private surveysService: SurveysService) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").get(this.sayHello).post(this.add);
        this.router.route("/all").get(this.findAll);
        this.router.route("/:id").delete(this.delete).put(this.update);
    }

    private sayHello = (_: Request, res: Response) => {
        const welcomeMessage = this.surveysService.getWelcomeMessage();
        res.send(welcomeMessage);
    };

    private findAll = async (_: Request, res: Response) => {
        try {
            const surveys = await this.surveysService.findAll();
            res.send(surveys);
        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send(e.message);
            }
            else {
                
            }
        }
    };

    private add = async (req: Request, res: Response) => {
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

    private delete = async (req: Request, res: Response) => {
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

    private update = async (req: Request, res: Response) => {
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