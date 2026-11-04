import { z } from 'zod';
import { zLocalDate, zNumber } from '../../design-system/form';
import { MemberCategories } from '../../types';
import { Genre } from '../../../common/enums';

export const DAYS = [
  ['monday', 'Lunes', 'L'],
  ['tuesday', 'Martes', 'K'],
  ['wednesday', 'Miércoles', 'M'],
  ['thursday', 'Jueves', 'J'],
  ['friday', 'Viernes', 'V'],
  ['saturday', 'Sábado', 'S'],
  ['sunday', 'Domingo', 'D'],
] as const;

const day = z.boolean().default(false);

export const memberSchema = z.object({
  name: z.string().trim().min(1, 'Requerido').max(100, 'Máximo 100 caracteres'),
  category: z.enum(['', ...Object.values(MemberCategories)]).default(''),
  genre: z.enum(['', ...Object.values(Genre)]).default(''),
  birthDate: zLocalDate({ required: false }).default(''),
  height: zNumber({ min: 0.5, max: 2.5, required: false }),
  phone: z
    .string()
    .max(10, 'Máximo 10 caracteres')
    .regex(/^[\d\s-]*$/, 'Solo dígitos, guiones y espacios')
    .default(''),
  email: z
    .string()
    .default('')
    .refine((v) => v === '' || z.email().safeParse(v).success, {
      message: 'Correo inválido',
    }),
  observations: z.string().default(''),
  isActive: z.boolean().default(true),
  preferredClassTime: z.string().default(''), // id del horario
  attendance: z
    .object({
      monday: day,
      tuesday: day,
      wednesday: day,
      thursday: day,
      friday: day,
      saturday: day,
      sunday: day,
    })
    .default({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }),
});

export type MemberFormInput = z.input<typeof memberSchema>;
export type MemberFormValues = z.output<typeof memberSchema>;
