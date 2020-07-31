import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsEmail, MaxLength, MinLength} from "class-validator";

import {Course} from "./Course";

@Entity()
export class Student {

  constructor(name: string, courses: Course[], key: number, email: string ) {
    this.name = name;
    this.courses = courses;
    this.key = key;
    this.email = email;
  }

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  @MaxLength(100, {message: "O nome deve ter no máximo 100 caracteres."})
  @MinLength(5, {message: "O nome deve ter no mpinimo 5 caracteres."})
  name: string;

  @ManyToMany(() => Course, course => course.students )
  courses: Course[];

  @Column()
  key: number;

  @Column()
  @IsEmail({ignore_max_length: true}, {message: "Email inválido."})
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
