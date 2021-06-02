import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("job_titles")
export class JobTitle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;
}
