import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Content} from "./Content";
import {Course} from "./Course";

@Entity()
export class Lesson {

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  description: string;

  @OneToOne(() => Content, content => content.lesson)
  content: Content;

  @ManyToOne(() => Course, courses => courses.lessons)
  @JoinColumn({ name: 'course_id'})
  course: Course;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
