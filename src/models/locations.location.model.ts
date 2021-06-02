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
import { Ride } from "./rides.ride.model";

@Entity("locations")
export class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany((type) => Entrance, (entrance) => entrance.location)
  entrances: Entrance[];

  @OneToMany((type) => Ride, (ride) => ride.location)
  rides: Ride[];
}
