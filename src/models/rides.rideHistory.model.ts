import {
  Entity,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Column,
} from "typeorm";
import { ParkVisit } from "./rider.parkVisit.model";
import { Ride } from "./rides.ride.model";

@Entity("ride_history")
export class RideHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  rideId: string;

  @ManyToOne((type) => Ride)
  @JoinColumn({ name: "rideId", referencedColumnName: "id" })
  ride: Ride;

  @ManyToMany((type) => ParkVisit, (parkVisit) => parkVisit.participatedRides)
  @JoinTable()
  participants: ParkVisit[];

  @CreateDateColumn()
  createdAt: Date;
}
