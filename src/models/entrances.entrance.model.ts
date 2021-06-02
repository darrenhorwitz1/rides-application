import { Rider } from "./riders.rider.model";
import { Location } from "./locations.location.model";
import {
  Entity,
  PrimaryGeneratedColumn,
  TableForeignKey,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("entrances")
export class Entrance {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  locationId: string;

  @ManyToOne((type) => Location)
  @JoinColumn({ name: "locationId", referencedColumnName: "id" })
  location: Location;
}
