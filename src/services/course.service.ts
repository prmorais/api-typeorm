import {Request, Response} from "express";
import {getCustomRepository, getRepository} from "typeorm";
import {validate} from "class-validator";

import {Course} from "../models/Course";
import courseRepository from "../repositories/courseRepository";

export class CourseService {

  static createCourse = async (req: Request, res: Response) => {
    const { name, duration, lessons, students } = req.body;

    try {
      const repo = getRepository(Course);
      const course = repo.create({
        name, duration, lessons, students
      });

      const errorsValidate = await validate(course);

      if(errorsValidate.length === 0) {
        const courseCreated = await repo.save(course);
        return res.status(201).json(courseCreated);
      }
      return res.status(400).json(errorsValidate.map(m => m.constraints));

    }catch (err) {
      console.log(err.message);
    }
  }

  static getAllPosts = async (req: Request, res: Response) => {
    const courses = await getRepository(Course).find({
      select:["name", "duration"],
      relations: ["students"]
    });

    return res.status(200).json(courses);
  }

  static getPostById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const classFound = await getRepository(Course).findOne({
      where: { id }
    });

    if (!classFound) {
      res.status(404).json({ message: `Not found Course for ID: ${id}`});
    }

    return res.status(200).json(classFound);
  }

  static getPostByName = async (req: Request, res: Response) => {
    const param = req.params.param;

    const coursesFound = await getCustomRepository(courseRepository).findByName(param);

    if (coursesFound.length === 0) {
      res.status(404).json({ message: `Not found Coursees.`});
    }

    return res.status(200).json(coursesFound);
  }
};
