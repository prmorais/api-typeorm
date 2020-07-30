import { Router } from 'express';
import {getCustomRepository, getRepository} from "typeorm";
import { Content } from "../models/Content";

const contentRouter = Router();

contentRouter.post('/', async (req, res) => {
  const { description, linkContent } = req.body;
  try {
    const repo = getRepository(Content);
    const contentCreated = await repo.save({ description, linkContent });
    return res.status(201).json(contentCreated);
  }catch (err) {
    console.log(err.message);
  }
});

contentRouter.get('/', async (req, res) => {
  const contents = await getRepository(Content).find();
  return res.status(200).json(contents);
});

contentRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  const contentFound = await getRepository(Content).findOne({
    where: { id }
  })

  if (!contentFound) {
    res.status(404).json({ message: `Not found Content for ID: ${ id }`});
  }

  return res.status(200).json(contentFound);
});

export default contentRouter;
