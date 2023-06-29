import {
  BodyMassIndex,
  Calories,
  CorporalFat,
  CorporalWaterPct,
  Muscle,
} from '../../common/enums';

type ColorMap = {
  color: string;
  emoji: string;
  results: string[];
};

const colorsMap: ColorMap[] = [
  {
    color: '#7dd87d',
    emoji: '😎',
    results: [
      CorporalFat.excellent,
      CorporalWaterPct.excellent,
      BodyMassIndex.normalWeight,
      Calories.good,
      Muscle.highQuality,
    ],
  },
  {
    color: '#79d1c3',
    emoji: '😃',
    results: [
      CorporalFat.good,
      CorporalWaterPct.good,
      BodyMassIndex.normalWeight,
      Muscle.standard,
    ],
  },
  {
    color: '#f2910a',
    emoji: '😐',
    results: [
      CorporalFat.regular,
      BodyMassIndex.underWeight,
      Muscle.belowAverage,
    ],
  },
  {
    color: '#e85b48',
    emoji: '😔',
    results: [
      CorporalFat.bad,
      CorporalWaterPct.bad,
      BodyMassIndex.overWeight,
      Calories.needsImprove,
    ],
  },
  {
    color: '#40a798',
    emoji: '🤷',
    results: [
      CorporalFat.undefined,
      CorporalWaterPct.undefined,
      BodyMassIndex.undefined,
      Calories.undefined,
      Muscle.undefined,
    ],
  },
];

export const getMeasureColorAndEmoji = (value: string) => {
  const { color, emoji } = colorsMap.find((c) => c.results.includes(value)) || {
    color: '#f5e1da',
    emoji: '🤔',
  };

  return {
    color,
    emoji,
  };
};
