import { z } from 'zod';

export const Paint = z.object({
	id: z.number().int().positive(),
	name: z.string().min(1, 'Project name is required'),
	type: z.string().min(1, 'Project type is required'),
	amount: z.number().positive(),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
});

export type Paint = z.infer<typeof Paint>;

export const Brand = z.object({
	id: z.number().int().positive(),
	name: z.string().min(1, 'Project name is required'),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
});

export type Brand = z.infer<typeof Brand>;

export const registrationSchema = z
	.object({
		displayName: z.string().min(3, 'Display name must be at least 3 characters long'),
		email: z.string().email('Invalid email address'),
		password: z.string().min(16, 'Password must be at least 16 characters long'),
		confirmPassword: z.string().min(16, 'Confirm password must be at least 16 characters long'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
	});

export type registrationSchema = z.infer<typeof registrationSchema>;
