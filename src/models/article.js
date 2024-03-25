import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js';

class Article extends Model {}

Article.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		imageUrl: {
			type: DataTypes.STRING,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		summary: {
			type: DataTypes.STRING,
		},
		views: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	},
	{
		sequelize,
		modelName: 'Article',
	}
);

export default Article;
