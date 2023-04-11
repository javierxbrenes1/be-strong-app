import { CorporalWaterPct, Genre } from '../../../common/enums';

type TableType = Record<string, (value: number) => boolean>;

const maleTable: TableType = {
  [CorporalWaterPct.bad]: (value: number) => value < 50,
  [CorporalWaterPct.good]: (value: number) => value >= 50 && value <= 65,
  [CorporalWaterPct.excellent]: (value: number) => value > 65,
};

const femaleTable: TableType = {
  [CorporalWaterPct.bad]: (value: number) => value < 45,
  [CorporalWaterPct.good]: (value: number) => value >= 45 && value <= 60,
  [CorporalWaterPct.excellent]: (value: number) => value > 60,
};

export const getCorporalWaterPctResult = (
  genre: Genre,
  value: number
): CorporalWaterPct => {
  const table = genre === Genre.male ? maleTable : femaleTable;

  const corporalWaterPct =
    Object.keys(table).find((k) => table[k](value)) ||
    CorporalWaterPct.undefined;

  return corporalWaterPct as CorporalWaterPct;
};
