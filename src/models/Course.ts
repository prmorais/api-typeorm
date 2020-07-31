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
import {Lesson} from "./Lesson";
import {Student} from "./Student";

@Entity()
export class Course {

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @OneToMany(() => Lesson, lesson => lesson.course)
  lessons: Lesson;

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
