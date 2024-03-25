import express, { json } from 'express';
import { Sequelize } from 'sequelize';
import { articlesRouter } from './src/routes/articles.js';
import { corsMiddleware } from './src/middlewares/cors.js';
import sequelize from './src/config/sequelizeConfig.js';
import morgan from 'morgan';

const app = express();

// Probar la conexión a la base de datos
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});

// Sincronizar modelos con la base de datos
sequelize
	.sync({ force: false })
	.then(() => {
		console.log('Database synced');
	})
	.catch((error) => {
		console.error('Error syncing database:', error);
	});

app.use(json());
app.use(corsMiddleware());
app.use(morgan('dev'));
app.disable('x-powered-by');

app.get('/', (req, res) => {
	res.send('<h3>Welcome to my personal blog api<h3>');
});

app.use('/articles', articlesRouter);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port http://localhost:${PORT}`);
});
