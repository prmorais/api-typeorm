import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {Lesson} from "../models/Lesson";

export class LessonService {

  static createLesson = async (req: Request, res: Response) => {

    try {
      const repo = getRepository(Lesson);
      const lesson = repo.create(req.body);

      const errorsValidate = await validate(lesson);

      if(errorsValidate.length === 0) {
        const lessonCreated = await repo.save(lesson);
        return res.status(201).json(lessonCreated);
      }

      return res.status(400).json(errorsValidate.map(m => m.constraints));

    }catch (err) {
      console.log(err.message);
    }
  }

  static getAllLessons = async (req: Request, res: Response) => {
    const lessons = await getRepository(Lesson).find({
      select: ["description"],
      relations: ["course", "content"]
    });
    return res.status(200).json(lessons);
  }

  static getLessonById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const lessonFound = await getRepository(Lesson).findOne({
      relations: ["course", "content"],
      where: { id }
    })

    if (!lessonFound) {
      res.status(404).json({ message: `Not found Lesson for ID: ${ id }`});
    }

    return res.status(200).json(lessonFound);
  }
}
