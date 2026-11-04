import { z } from 'zod';
import { isLocalDate, isLocalTime } from '../../../common/dates';

type NumberOpts = {
  min?: number;
  max?: number;
  int?: boolean;
  required?: boolean;
};

const NUMERIC = /^-?\d+([.,]\d+)?$/;

function numberIssue(raw: string, opts: NumberOpts): string | undefined {
  const { min, max, int, required = true } = opts;
  const text = raw.trim();
  if (text === '') return required ? 'Requerido' : undefined;
  if (!NUMERIC.test(text)) return 'Debe ser un número';
  const value = Number(text.replace(',', '.'));
  if (int && !Number.isInteger(value)) return 'Debe ser un número entero';
  if (min !== undefined && value < min) return `Mínimo ${min}`;
  if (max !== undefined && value > max) return `Máximo ${max}`;
  return undefined;
}

// El input guarda texto crudo; aquí se valida y se convierte a número.
export const zNumber = (opts: NumberOpts = {}) =>
  z
    .preprocess(
      (v) => (v === null || v === undefined ? '' : String(v)),
      z.string()
    )
    .superRefine((raw, ctx) => {
      const message = numberIssue(raw, opts);
      if (message) ctx.addIssue({ code: 'custom', message });
    })
    .transform((raw) =>
      raw.trim() === '' ? undefined : Number(raw.trim().replace(',', '.'))
    );

export const zLocalDate = ({ required = true } = {}) =>
  z.string().refine((v) => (v === '' ? !required : isLocalDate(v)), {
    message: 'Fecha inválida',
  });

export const zLocalTime = () =>
  z.string().refine((v) => isLocalTime(v), { message: 'Hora inválida' });
