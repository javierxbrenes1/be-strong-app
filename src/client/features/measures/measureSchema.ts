import { z } from 'zod';
import { zNumber } from '../../design-system/form';

// Rangos: límites razonables fijados por el plan; ajustables aquí.
export const measureSchema = z.object({
  date: z.number({ message: 'Fecha inválida' }), // instante, epoch ms
  weight: zNumber({ min: 20, max: 300 }),
  bodyMassIndex: zNumber({ min: 5, max: 80 }),
  corporalFat: zNumber({ min: 1, max: 80 }),
  muscle: zNumber({ min: 1, max: 80 }),
  corporalWaterPct: zNumber({ min: 10, max: 90 }),
  calories: zNumber({ min: 500, max: 6000 }),
});

export type MeasureFormInput = z.input<typeof measureSchema>;
export type MeasureFormValues = z.output<typeof measureSchema>;
