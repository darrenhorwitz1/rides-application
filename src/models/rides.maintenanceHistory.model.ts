import {
  Entity,
  CreateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Employee } from "./employees.employee.model";
import { Ride } from "./rides.ride.model";

export enum EMaintenenanceHistoryStatus {
  ROUTINE = "routine",
  HEAVY_FIX = "heavy_fix",
  MEDIUM_FIX = "medium_fix",
  LIGHT_FIX = "light_fix",
}

@Entity("maintenance_history")
export class MaintenanceHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  rideId: string;

  @ManyToOne((type) => Ride)
  @JoinColumn({ name: "rideId", referencedColumnName: "id" })
  ride: Ride;

  @Column({ nullable: true })
  maintainerId: string;

  @ManyToOne((type) => Employee)
  @JoinColumn({ name: "maintainerId", referencedColumnName: "id" })
  maintainer: Employee;

  @Column({
    type: "varchar",
    default: EMaintenenanceHistoryStatus.ROUTINE,
  })
  status: EMaintenenanceHistoryStatus;

  @CreateDateColumn()
  createdAt: Date;
}
