import { Application } from "express";
import { DashboardRouting } from "./routes/dashboard.routing";
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
        this.app.use("/dashboard", dashboardMiddleware);
        this.app.use("/dashboard", new DashboardRouting().router);
    }

    private setViews() {
        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'jsx');
        this.app.engine('jsx', require('express-react-views').createEngine());
    }
}

export default new App().app;