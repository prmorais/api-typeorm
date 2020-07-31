import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {Student} from "../models/Student";

export class StudentService {

  static createPost = async (req: Request, res: Response) => {
    const { name, courses, key, email } = req.body;

    try {
      const repo = getRepository(Student);
      const student = repo.create({
        name, courses, key, email
      });

      const errorsValidate = await validate(student);

      if(errorsValidate.length === 0) {
        const studentCreated = await repo.save(student)
        return res.status(201).json(studentCreated);
      }
      return res.status(400).json(errorsValidate.map(m => m.constraints));

    }catch (err) {
      console.log(err.message);
    }
  }

  static getAllStudents =  async (req: Request, res: Response) => {
    const students: Student[] = await getRepository(Student).find({
      select: ["id", "name", "key", "email"],
      relations: ["courses"]
    });
    return res.status(200).json(students);
  }

  static getStudentsById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const studentFound = await getRepository(Student).findOne({
      select: ["id", "name", "key", "email"],
      relations: ["courses"],
      where: { id }
    });

    if (!studentFound) {
      res.status(404).json({ message: `Not found Student for ID: ${ id }`});
    }

    return res.status(200).json(studentFound);
  }

}
