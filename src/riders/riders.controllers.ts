import { IRiderRepository, RiderRepository } from "./riders.repository";
import express from "express";
import { getCustomRepository } from "typeorm";
import { Rider } from "../models/riders.rider.model";

let riderRepository: IRiderRepository;

export const postReturningRider = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    
    riderRepository = getCustomRepository(RiderRepository);
    let pv = await riderRepository.revisitingRider(
      "5a73d2c5-9e2e-4362-9565-ca3caa103293",
      "25e7c1f1-6011-46e3-b656-04bfe0d92816",
      "7287684e-57a2-4fd2-8e8a-d02aaafeea89"
    );

    res.status(200).send(pv);
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
};

export const postFirstTimeParkVisit = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    riderRepository = getCustomRepository(RiderRepository);
    let pv = await riderRepository.firstTimeParkVisit();
    res.status(200).send(pv);
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
};

export const postNewRider = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //let r: RiderAttributes = req.body;
  try {
    let r: Rider;
    riderRepository = getCustomRepository(RiderRepository);
    r = await riderRepository.createRider();
    console.log(r);
    res.status(200).send("done");
  } catch (error) {
    res.status(400).send("ERROR");
  }
};

export const getRiderById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    riderRepository = getCustomRepository(RiderRepository);
    let rider = await riderRepository.findRiderById(
      "5a73d2c5-9e2e-4362-9565-ca3caa103293"
    );

    res.status(200).send(rider);
  } catch (error) {
    res.status(400).send("ERROR");
    console.log(error);
  }
};

export const putRiderById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    riderRepository = getCustomRepository(RiderRepository);
    let rider = await riderRepository.updateRider({
      id: "d857ca05-77ae-4187-8ff2-3666e1914d90",
      firstName: "Mfanna",
      lastName: "NO WAY BISh",
    });
    res.status(200).send(rider);
  } catch (error) {
    res.status(400).send("ERROR");
    console.log(error);
  }
};
