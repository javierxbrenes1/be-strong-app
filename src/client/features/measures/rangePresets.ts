import dayjs from 'dayjs';
import { LocalDate } from '../../../common/dates';

export type RangePreset = {
  id: 'year' | '6m' | '3m';
  label: string;
  from: LocalDate;
  to: LocalDate;
};

// "Últimos N meses" arranca el día 1 del mes de hace N-1 meses, como la UI anterior.
export function rangePresets(today: LocalDate): RangePreset[] {
  const t = dayjs(today);
  const monthStart = (back: number) =>
    t.subtract(back, 'month').startOf('month').format('YYYY-MM-DD');
  return [
    {
      id: 'year',
      label: 'Este año',
      from: t.startOf('year').format('YYYY-MM-DD'),
      to: today,
    },
    { id: '6m', label: 'Últimos 6 meses', from: monthStart(5), to: today },
    { id: '3m', label: 'Últimos 3 meses', from: monthStart(2), to: today },
  ];
}
