import { Router } from 'express';
import { ArticleController } from '../controllers/articles.js';

const articlesRouter = Router();

articlesRouter.get('/', ArticleController.getAll);

articlesRouter.get('/:id', ArticleController.getById);

articlesRouter.post('/', ArticleController.create);

articlesRouter.delete('/:id', ArticleController.delete);

articlesRouter.patch('/:id', ArticleController.update);

export default articlesRouter;
