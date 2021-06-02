import express from "express";
import { getCustomRepository } from "typeorm";
import { IRidesRepository, RidesRepository } from "./rides.repository";

let ridesRepository: IRidesRepository;

export const postRideEvent = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  ridesRepository = getCustomRepository(RidesRepository);
  try {
    const rideId = req.body.rideId;
    const _rideEvent = await ridesRepository.createRideEvent(rideId);

    res.status(200).send(_rideEvent);
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
};

export const postRideEventParticipant = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  ridesRepository = getCustomRepository(RidesRepository);
  try {
    const rideHistoryId = req.params.rideEventId;
    const parkVisitId = req.body.parkVisitId;
    await ridesRepository.addRiderToRideEvent({
      rideHistoryId: rideHistoryId.toString(),
      parkVisitId: parkVisitId.toString(),
    });

    res.status(200).send("DONE");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
};

export const deleteRideEventParticipant = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  ridesRepository = getCustomRepository(RidesRepository);

  try {
    const parkVisitId = req.body.parkVisitId;
    const rideHistoryId = req.params.rideEventId;
    await ridesRepository.removeRiderToRideEvent({
      rideHistoryId: rideHistoryId.toString(),
      parkVisitId: parkVisitId.toString(),
    });

    res.status(200).send("DONE");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
};

export const patchRideOperator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  ridesRepository = getCustomRepository(RidesRepository);
  try {
    const rideId = req.params.rideId;
    const employeeId = req.body.employeeId;
    await ridesRepository.changeOperator(employeeId, rideId);

    res.status(200).send("DONE");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
};

export const patchRidePassType = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  ridesRepository = getCustomRepository(RidesRepository);
  try {
    const rideId = req.params.rideId;
    const passTypeId = req.body.passTypeId;
    await ridesRepository.changePassType(passTypeId, rideId);

    res.status(200).send("DONE");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
};
