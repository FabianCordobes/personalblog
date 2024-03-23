import express, { json } from 'express';
import { articlesRouter } from './src/routes/articles.js';
import { corsMiddleware } from './src/middlewares/cors.js';


const app = express();
app.use(json());
app.use(corsMiddleware())
app.disable('x-powered-by');

app.get('/', (req, res) => {
	res.send('<h3>Welcome to my personal blog api<h3>');
});

app.use('/articles', articlesRouter);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`);
});
