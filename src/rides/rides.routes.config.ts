import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";

import * as ridesController from "./rides.controller";

export class RidesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "RidesRoutes");
  }

  configureRoutes(): express.Application {
    // this.app.route().post();

    this.app
      .route("/rides/ride-event/:rideEventId/participant")
      .post(ridesController.postRideEventParticipant);

    this.app
      .route("/rides/ride-event/:rideEventId/participant")
      .delete(ridesController.deleteRideEventParticipant);

    this.app
      .route("/rides/:rideId/change-operator")
      .patch(ridesController.patchRideOperator);

    this.app
      .route("/rides/:rideId/change-passtype")
      .patch(ridesController.patchRidePassType);

    this.app.route("/rides/ride-event").post(ridesController.postRideEvent);

    return this.app;
  }
}
