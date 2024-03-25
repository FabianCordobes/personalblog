import express from 'express';
import { TagController } from '../controllers/tags.js';

const tagsRouter = express.Router();

tagsRouter.get('/', TagController.getAll);
tagsRouter.post('/', TagController.create);
tagsRouter.delete('/:id', TagController.delete);

export default tagsRouter;
