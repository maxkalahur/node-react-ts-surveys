import { MONGO_URL } from "./constants/surveys.constants";
import { Application } from "express";
import { SurveysController } from "./controllers/surveys.controller";
import { SurveysService } from "./services/surveys.service";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfig() {
    // Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: "50mb" }));
    // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    // Enables cors
    this.app.use(cors());
  }

  private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGO_URL);
        mongoose.set("toJSON", {
            virtuals: true,
            transform: (_: any, converted: any) => {
                delete converted._id;
            },
        });
  }

  private setControllers() {
    // Creating a new instance of our Pokemon Controller
    const surveysController = new SurveysController(new SurveysService());

    // Telling express to use our Controller's routes
    this.app.use("/", surveysController.router);
  }
}

export default new App().app;