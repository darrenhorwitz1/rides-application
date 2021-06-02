import { Rider } from "./riders.rider.model";
import { PassType } from "./passTypes.passType.model";
import {
  Entity,
  PrimaryGeneratedColumn,
  TableForeignKey,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { Entrance } from "./entrances.entrance.model";
import { RideHistory } from "./rides.rideHistory.model";
import { type } from "node:os";

@Entity("park_visits")
export class ParkVisit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //date that the rider came to the park and purchased a ticket
  @CreateDateColumn()
  visitedAt: Date;

  @ManyToMany((type) => RideHistory, (rideHistory) => rideHistory.participants)
  participatedRides: RideHistory[];

  @Column({ nullable: true })
  riderId: string;

  @ManyToOne((type) => Rider)
  @JoinColumn({ name: "riderId", referencedColumnName: "id" })
  rider: Rider;

  @Column({ nullable: true })
  passTypeId: string;

  @ManyToOne((type) => PassType)
  @JoinColumn({ name: "passTypeId", referencedColumnName: "id" })
  passType: PassType;

  @Column({ nullable: true })
  entranceId: string;

  @ManyToOne((type) => Entrance)
  @JoinColumn({ name: "entranceId", referencedColumnName: "id" })
  entrance: Entrance;
}
