import Article from '../models/article.js';
import Tag from '../models/tag.js';
import ArticleTag from '../models/ArticleTag.js';
import { validateArticle, validatePartialArticle } from '../schemas/articles.js';

export class ArticleController {
	static async getAll(req, res) {
		try {
			const articles = await Article.findAll({
				include: [
					{
						model: Tag,
						attributes: ['name'],
						through: {
							attributes: [], // Esto excluye los atributos de la tabla intermedia (ArticleTag)
						},
					},
				],
				attributes: { exclude: ['createdAt', 'updatedAt'] }, // Esto excluye createdAt y updatedAt del artículo
			});

			const formattedArticles = articles.map((article) => ({
				...article.toJSON(),
				Tags: article.Tags.map((tag) => tag.name), // Transforma la estructura de Tags
			}));

			res.json(formattedArticles);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async getById(req, res) {
		try {
			const { id } = req.params;
			const article = await Article.findByPk(id, {
				include: Tag,
			});
			if (article) {
				return res.json(article);
			}
			res.status(404).json({ message: 'Article not found' });
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async create(req, res) {
		try {
			const result = validateArticle(req.body);
			if (!result.success) {
				return res.status(400).json({ error: JSON.parse(result.error.message) });
			}
			console.log(result.data);

			const { tags, ...articleData } = result.data;

			// Crear el artículo
			const newArticle = await Article.create(articleData);

			// Crear o encontrar los tags y asociarlos al artículo
			if (tags && tags.length > 0) {
				const tagInstances = await Promise.all(
					tags.map((tagName) => Tag.findOrCreate({ where: { name: tagName } }))
				);

				await newArticle.addTags(tagInstances.map((tag) => tag[0]));
			}

			// Incluir las etiquetas asociadas al artículo en la respuesta
			const articleWithTags = await Article.findOne({
				where: { id: newArticle.id },
				include: [{ model: Tag, attributes: ['id', 'name'] }],
			});

			res.status(201).json(articleWithTags);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async delete(req, res) {
		try {
			const { id } = req.params;
			const result = await Article.destroy(id);

			if (result === 0) {
				return res.status(404).json({ message: 'Article not found' });
			}

			return res.json({ message: 'Article deleted' });
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async update(req, res) {
		try {
			const result = validatePartialArticle(req.body);

			if (!result.success) {
				return res.status(400).json({ error: JSON.parse(result.error.message) });
			}

			const { id } = req.params;
			const [updated] = await Article.update(result.data, {
				where: { id },
			});

			if (updated) {
				const updatedArticle = await Article.findByPk(id);
				return res.json(updatedArticle);
			}
			return res.status(404).json({ message: 'Article not found' });
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
}
