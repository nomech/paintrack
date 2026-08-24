import { z } from 'zod';

export const Paint = z.object({
	id: z.number().int().positive(),
	name: z.string().min(1, 'Project name is required'),
	type: z.string().min(1, 'Project type is required'),
	amount: z.number().positive(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export type Paint = z.infer<typeof Paint>;
