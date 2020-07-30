import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Lesson} from "./Lesson";

@Entity()
export class Content {

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  description: string;

  @OneToOne(() => Lesson, lesson => lesson.content )
  @JoinColumn({name: 'lesson_id'})
  lesson: Lesson;

  @Column()
  linkContent: string;
}
