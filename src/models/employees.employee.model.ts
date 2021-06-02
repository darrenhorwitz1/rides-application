import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobTitle } from "./jobTitles.jobTitle.model";

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  jobTitleId: string;

  @ManyToOne((type) => JobTitle)
  @JoinColumn({ name: "jobTitleId", referencedColumnName: "id" })
  jobTitle: JobTitle;

  @Column()
  isMechanic: boolean;

  @Column()
  isOperator: boolean;
}
