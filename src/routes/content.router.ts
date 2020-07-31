import { Router } from 'express';

import {ContentService} from "../services/content.service";

const contentRouter = Router();

contentRouter.post('/', ContentService.createContent);

contentRouter.get('/', ContentService.getContents);

contentRouter.get('/:id', ContentService.getContentById);

export default contentRouter;
