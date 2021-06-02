import express from "express";
import * as riderController from "./riders.controllers";
import { CommonRoutesConfig } from "../common/common.routes.config";

export class RidersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "RidersRoutes");
  }

  configureRoutes() {
    this.app.route("/riders").post(riderController.postNewRider);

    this.app.route("/riders/:riderId").get(riderController.getRiderById);

    this.app
      .route("/riders/first-park-visit")
      .post(riderController.postFirstTimeParkVisit);

    this.app
      .route("/riders/returning-rider-visit")
      .post(riderController.postReturningRider);

    this.app.route("/riders/:riderId").put(riderController.putRiderById);

    return this.app;
  }
}
