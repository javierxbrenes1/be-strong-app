import { z } from 'zod';

const required = z.string().min(1, 'Requerido');

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Requerido'),
  pwd: required, // sin trim: se valida tal cual
});

export type LoginValues = z.infer<typeof loginSchema>;
