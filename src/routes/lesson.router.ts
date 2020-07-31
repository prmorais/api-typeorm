import {Router} from 'express';

import {LessonService} from "../services/lesson.service";

const lessonRouter = Router();

lessonRouter.post('/', LessonService.createLesson);

lessonRouter.get('/', LessonService.getAllLessons);

lessonRouter.get('/:id', LessonService.getLessonById);

export default lessonRouter;
