import { Entrance } from "./entrances.entrance.model";
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
  OneToMany,
} from "typeorm";
import { RideType } from "./rideTypes.rideType.model";
import { PassType } from "./passTypes.passType.model";
import { Employee } from "./employees.employee.model";

export enum EOperationalStatus {
  GOOD = "good",
  BAD = "bad",
  IN_MAINTENANCE = "in_maintenance",
}

@Entity("rides")
export class Ride {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  locationId: string;
  //gotta change this shizz
  @ManyToOne((type) => Location)
  @JoinColumn({ name: "locationId", referencedColumnName: "id" })
  location: Location;

  @Column({ nullable: true })
  rideTypeId: string;
  @ManyToOne((type) => RideType)
  @JoinColumn({ name: "rideTypeId", referencedColumnName: "id" })
  rideType: RideType;

  @Column({ nullable: true })
  passTypeId: string;
  @ManyToOne((type) => PassType)
  @JoinColumn({ name: "passTypeId", referencedColumnName: "id" })
  passType: PassType;

  @Column({ nullable: true })
  operatorId: string;
  @ManyToOne((type) => Employee)
  @JoinColumn({ name: "operatorId", referencedColumnName: "id" })
  operator: Employee;

  ///NEED TO LOOK INTO ENUM FIELDS FOKKEN HELELLLLLLLL LOLOOLOLOLOLOLOLOLOL
  @Column({
    type: "varchar",
    default: EOperationalStatus.GOOD,
  })
  operationalStatus: EOperationalStatus;

  @Column({ type: "int" })
  maxCapacity: number;
}

/**
 * TODO:
 *
 */
