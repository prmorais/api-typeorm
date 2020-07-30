import { Router } from 'express';
import courseRouter from './course.router';
import lessonRouter from "./lesson.router";
import studentRouter from "./student.router";
import contentRouter from "./content.router";

const routes = Router();

routes.use('/course', courseRouter);
routes.use('/lesson', lessonRouter);
routes.use('/student', studentRouter);
routes.use('/content', contentRouter);

export default routes;
