import { Router } from 'express';
import {getRepository} from "typeorm";
import { validate } from "class-validator";

import { Student } from "../models/Student";

const studentRouter = Router();

studentRouter.post('/', async (req, res) => {
  const { name, key, email } = req.body;
  try {
    const repo = getRepository(Student);
    const student = repo.create({ name, key, email});
    const errorsValidate = await validate(student);

    if(errorsValidate.length === 0) {
      const studentCreated = await repo.save(student)
      return res.status(201).json(studentCreated);
    }
    return res.status(400).json(errorsValidate.map(m => m.constraints));

  }catch (err) {
    console.log(err.message);
  }
});

studentRouter.get('/', async (req, res) => {
  const students = await getRepository(Student).find();
  return res.status(200).json(students);
});

studentRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  const studentFound = await getRepository(Student).findOne({
    where: { id }
  })

  if (!studentFound) {
    res.status(404).json({ message: `Not found Student for ID: ${ id }`});
  }

  return res.status(200).json(studentFound);
});

export default studentRouter;
