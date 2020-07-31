import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {Content} from "../models/Content";

export class ContentService {

  static createContent = async (req: Request, res: Response) => {
    const { description, linkContent, lesson } = req.body;

    try {
      const repo = getRepository(Content);
      const content = repo.create({
        description, linkContent, lesson
      });

    // console.log(content);


      const errorsValidate = await validate(content);

      if(errorsValidate.length === 0) {
        const contentCreated = await repo.save(content);
        return res.status(201).json(contentCreated);
      }
      return res.status(400).json(errorsValidate.map(m => m.constraints));

    }catch (err) {
      console.log(err.message);
    }
  }

  static getContents = async (req: Request, res: Response) => {
    const contents = await getRepository(Content).find({
      select: ["id", "description", "linkContent"],
      relations: ["lesson"]
    });
    return res.status(200).json(contents);
  }

  static getContentById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const contentFound = await getRepository(Content).findOne({
      select: ["id", "description", "linkContent"],
      where: { id }
    })

    if (!contentFound) {
      res.status(404).json({ message: `Not found Content for ID: ${ id }`});
    }

    return res.status(200).json(contentFound);
  }
}
