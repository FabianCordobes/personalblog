import z from 'zod';

const articleSchema = z.object({
	title: z.string({
		invalid_type_error: 'Article title must be a string',
		required_error: 'Article title is required',
	}),
	author: z.string({
		invalid_type_error: 'Article author must be a string',
	}),
	content: z.string({
		invalid_type_error: 'Article content must be a string',
		required_error: 'Article content is required',
	}),
	date: z.date({
		required_error: 'Please select a date and time',
		invalid_type_error: "That's not a date!",
	}),
	imageUrl: z.string().url({
		message: 'imageUrl must be a valid URL',
	}),
	category: z.string({
		invalid_type_error: 'Article category must be a string',
		required_error: 'Article category is required',
	}),
	tags: z.array(z.string().optional(), {
		invalid_type_error: 'Article tags must be an array of strings tags',
	}),
	summary: z.string(),
	views: z.number().int().positive().default(0),
});

export function validateArticle(input) {
	return articleSchema.safeParse(input);
}

export function validatePartialArticle(input) {
	return articleSchema.partial().safeParse(input);
}
