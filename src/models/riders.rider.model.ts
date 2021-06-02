import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ParkVisit } from "./rider.parkVisit.model";

@Entity("riders")
export class Rider {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "date", nullable: true })
  dateOfBirth: Date;

  @OneToMany((type) => ParkVisit, (parkVisit) => parkVisit.rider)
  parkVisits: ParkVisit[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
