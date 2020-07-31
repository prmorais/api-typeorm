import { Router } from 'express';

import {CourseService} from "../services/course.service";

const courseRouter = Router();

courseRouter.post('/', CourseService.createCourse);

courseRouter.get('/', CourseService.getAllPosts);

courseRouter.get('/:id', CourseService.getPostById);

courseRouter.get('/name/:param', CourseService.getPostByName);

export default courseRouter;
