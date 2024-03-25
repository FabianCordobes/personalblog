import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js';

class Tag extends Model {}

Tag.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		modelName: 'Tag',
	}
);

export default Tag;
