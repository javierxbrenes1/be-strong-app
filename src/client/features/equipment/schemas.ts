import { z } from 'zod';
import { zNumber } from '../../design-system/form';

export const equipmentSchema = z.object({
  uuid: z.string().optional(),
  description: z.string().trim().min(1, 'Requerido'),
  brand: z.string().trim().default(''),
  total: zNumber({ min: 0, int: true }),
});

export const categorySchema = z.object({
  name: z.string().trim().min(1, 'Requerido').max(50, 'Máximo 50 caracteres'),
  equipment: z.array(equipmentSchema),
});

export type EquipmentForm = z.input<typeof equipmentSchema>;
export type EquipmentValues = z.output<typeof equipmentSchema>;
export type CategoryForm = z.input<typeof categorySchema>;
export type CategoryValues = z.output<typeof categorySchema>;
