import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {IsNotEmpty} from "class-validator";

import {Lesson} from "./Lesson";
import {Student} from "./Student";

@Entity()
export class Course {

  @PrimaryGeneratedColumn("increment")
  id: number;

  @IsNotEmpty({message: "O Nome deve ser informado."})
  @Column({ length: 100, unique: true })
  name: string;

  @OneToMany(() => Lesson, lessons => lessons.course)
  lessons: Lesson[];

  @ManyToMany(() => Student, student => student.courses)
  @JoinTable({name: 'course_student',
    joinColumns: [ { name: "course_id", referencedColumnName: 'id' } ] ,
    inverseJoinColumns:[ { name: "student_id", referencedColumnName: 'id' } ]
  })
  students: Student[];

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
