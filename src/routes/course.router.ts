import { Router } from 'express';
import {getCustomRepository, getRepository} from "typeorm";
import { Course } from "../models/Course";
import courseRepository from "../repositories/courseRepository";

const courseRouter = Router();

courseRouter.post('/', async (req, res) => {
  const { name, duration } = req.body;
  try {
    const repo = getRepository(Course);
    const courseCreated = await repo.save({name, duration});
    return res.status(201).json(courseCreated);
  }catch (err) {
    console.log(err.message);
  }
});

courseRouter.get('/', async (req, res) => {
  const courses = await getRepository(Course).find({
    relations: ['lessons']
  });

  return res.status(200).json(courses);
});

courseRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const classFound = await getRepository(Course).findOne({
    where: { id }
  });

  if (!classFound) {
    res.status(404).json({ message: `Not found Course for ID: ${id}`});
  }

  return res.status(200).json(classFound);
});

courseRouter.get('/name/:param', async (req, res) => {
  const param = req.params.param;

  const coursesFound = await getCustomRepository(courseRepository).findByName(param);

  if (coursesFound.length === 0) {
    res.status(404).json({ message: `Not found Coursees.`});
  }

  return res.status(200).json(coursesFound);
});

export default courseRouter;
