import { Ride } from "./rides.ride.model";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
} from "typeorm";

@Entity("ride_types")
export class RideType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  //gotta change this shizz
  @OneToMany((type) => Ride, (ride) => ride.rideType)
  @JoinColumn()
  rides: Ride[];
}
