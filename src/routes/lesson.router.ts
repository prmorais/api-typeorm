import {Router} from 'express';
import {getRepository} from "typeorm";
import {Lesson} from "../models/Lesson";

const lessonRouter = Router();

lessonRouter.post('/', async (req, res) => {
  // const { description } = req.body;
  try {
    const repo = getRepository(Lesson);
    const lessonCreated = await repo.save(req.body);
    return res.status(201).json(lessonCreated);
  }catch (err) {
    console.log(err.message);
  }
});

lessonRouter.get('/', async (req, res) => {
  const lessons = await getRepository(Lesson).find({
    relations: ['course']
  });
  return res.status(200).json(lessons);
});

lessonRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  const lessonFound = await getRepository(Lesson).findOne({
    where: { id }
  })

  if (!lessonFound) {
    res.status(404).json({ message: `Not found Lesson for ID: ${ id }`});
  }

  return res.status(200).json(lessonFound);
});

export default lessonRouter;
