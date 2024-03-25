import Tag from '../models/tag.js';

export class TagController {
	static async getAll(req, res) {
		try {
			const tags = await Tag.findAll({
				attributes: ['name'],
			});
			res.json(tags);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async create(req, res) {
		try {
			const { name } = req.body;
			const newTag = await Tag.create({ name });
			res.status(201).json(newTag);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async delete(req, res) {
		try {
			const { id } = req.params;
			const result = await Tag.destroy({ where: { id } });

			if (result === 0) {
				return res.status(404).json({ message: 'Tag not found' });
			}

			res.json({ message: 'Tag deleted' });
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
}
