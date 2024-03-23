import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { validateArticle, validatePartialArticle } from '../schemas/articles.js';
import { readJSON } from '../utils/readJSON.js';

const articles = readJSON('../utils/articles.json');

export const articlesRouter = Router();

articlesRouter.get('/', (req, res) => {
	try {
		res.status(201).json({
			status: 'success',
			data: articles,
		});
	} catch (error) {
		res.status(400).json;
		({ status: 'error', message: error.message });
	}
});

articlesRouter.get('/:id', (req, res) => {
	try {
		const { id } = req.params;
		const article = articles.find((article) => article.id === id);
		if (article) {
			return res.json(article);
		}
		res.status(404).json({ message: 'Article not found' });
	} catch (error) {
		res.status(500).json(error.message);
	}
});

articlesRouter.post('/', (req, res) => {
	const result = validateArticle(req.body);
	if (!result.success) {
		return res.status(400).json({ error: JSON.parse(result.error.message) });
	}

	//aca se debería guardar el artículo en la db.
	const newArticle = {
		id: randomUUID(),
		...result.data,
	};

	articles.push(newArticle);

	res.status(201).json(newArticle);
});

articlesRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	const articleIndex = articles.findIndex((article = article.id === id));

	if (articleIndex === -1) {
		return res.status(404).json({ message: 'Article not found' });
	}

	// Acá se tiene que eliminar el articulo en la db
	articles.splice(articleIndex, 1);

	return res.json({ message: 'Article deleted' });
});

articlesRouter.patch('/:id', (req, res) => {
	const result = validatePartialArticle(req.body);

	if (!result.success) {
		return res.status(404).json({ message: 'Article not found' });
	}

	const updateArticle = {
		...articles[articleIndex],
		...result.data,
	};

	articles[articleIndex] = updateArticle;

	return res.json(updateArticle);
});
