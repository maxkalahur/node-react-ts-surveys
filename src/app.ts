import { Application } from "express";
import { DashboardRouting } from "./routes/dashboard.routing";
// import { SurveyRouting } from "./routes/survey.routing";
// import { ApiSurveyRouting } from "./routes/api/survey.routing";
import dashboardMiddleware from "./middlewares/dashboard.middleware";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./config";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.setAppConfig();
        this.setMongoConfig();
        this.setRoutes();
        this.setViews();
    }

    private setAppConfig() {
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(cors());
        this.app.use(express.static(__dirname + '/../public'));

        const session = require('express-session');
        if (this.app.get('env') === 'production') {
            this.app.set('trust proxy', 1);
        }
        this.app.use(session(config.app.session));
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.mongo.url);
        mongoose.set("toJSON", {
            virtuals: true,
            transform: (_: any, converted: any) => {
                delete converted._id;
            },
        });
    }

    private setRoutes() {
        this.app.use("/dashboard", dashboardMiddleware, new DashboardRouting().router);
        // this.app.use("/dashboard/:surveyId", dashboardMiddleware, new SurveyRouting().router);
        // this.app.use("/api/survey", new ApiSurveyRouting().router);
    }

    private setViews() {
        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'pug');
    }
}

export default new App().app;