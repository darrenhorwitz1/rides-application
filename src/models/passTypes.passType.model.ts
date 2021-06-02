import { Rider } from "./riders.rider.model";
import { Entrance } from "./entrances.entrance.model";
import {
  Entity,
  PrimaryGeneratedColumn,
  TableForeignKey,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { type } from "node:os";
import { ParkVisit } from "./rider.parkVisit.model";
import { Ride } from "./rides.ride.model";

@Entity("pass_types")
export class PassType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //will be in cents thus stored as an integer to prevent rounding issues
  @Column({ type: "int" })
  price: number;

  @Column()
  title: string;

  @OneToMany((type) => ParkVisit, (parkVisit) => parkVisit.passType)
  parkVisits: ParkVisit[];

  //gotta change this shizz
  @OneToMany((type) => Ride, (ride) => ride.passType)
  rides: Ride[];

  @CreateDateColumn()
  createdAt: Date;
}
