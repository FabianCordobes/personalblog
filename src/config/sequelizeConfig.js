import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('blogpersonaldb', 'root', '12345', {
	host: 'localhost',
	dialect: 'mysql',
	logging: false,
	define: {
		timestamps: true,
		underscored: true,
	},
});

export default sequelize;
