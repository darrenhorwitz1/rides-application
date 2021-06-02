import { ConnectionOptions } from "typeorm";

// models
import { Rider } from "../models/riders.rider.model";
import { Employee } from "../models/employees.employee.model";
import { Entrance } from "../models/entrances.entrance.model";
import { JobTitle } from "../models/jobTitles.jobTitle.model";
import { Location } from "../models/locations.location.model";
import { PassType } from "../models/passTypes.passType.model";
import { RideType } from "../models/rideTypes.rideType.model";
import { ParkVisit } from "../models/rider.parkVisit.model";
import { MaintenanceHistory } from "../models/rides.maintenanceHistory.model";
import { Ride } from "../models/rides.ride.model";
import { RideHistory } from "../models/rides.rideHistory.model";

const config: ConnectionOptions = {
  type: "sqlite",
  database: "../db/theme_park.db",
  entities: [
    Rider,
    Employee,
    Entrance,
    JobTitle,
    Location,
    PassType,
    RideType,
    ParkVisit,
    MaintenanceHistory,
    Ride,
    RideHistory,
  ],
  synchronize: true, //change when in production
};

export default config;
