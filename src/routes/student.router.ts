import { Router } from 'express';

import {StudentService} from "../services/student.service";

const studentRouter = Router();

studentRouter.post('/', StudentService.createPost);

studentRouter.get('/', StudentService.getAllStudents);

studentRouter.get('/:id', StudentService.getStudentsById);

export default studentRouter;
