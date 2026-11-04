import { z } from 'zod';
import { zNumber } from '../../design-system/form';

export const classSchema = z.object({
  classType: z
    .string()
    .trim()
    .min(1, 'Requerido')
    .max(50, 'Máximo 50 caracteres'),
  classDurationInMinutes: zNumber({ int: true, min: 1, required: false }),
  classTimeIds: z.array(z.number()).min(1, 'Selecciona al menos un horario'),
  classDescription: z.string().optional(),
});

export type ClassFormInput = z.input<typeof classSchema>;
export type ClassFormValues = z.output<typeof classSchema>;
