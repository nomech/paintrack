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

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(16, 'Password must be at least 16 characters long'),
});

export type loginSchema = z.infer<typeof loginSchema>;

export const AddPaintSchema = z.object({
	name: z.string().min(1, 'Paint name is required'),
	type: z.string().min(1, 'Paint type is required'),
	amount: z.number().positive('Amount must be a positive number'),
	brandId: z.number().int().positive('Brand ID must be a positive integer'),
});

export type AddPaintSchema = z.infer<typeof AddPaintSchema>;

export type formData = registrationSchema | loginSchema | AddPaintSchema;
