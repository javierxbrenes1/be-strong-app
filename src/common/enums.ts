export enum Genre {
  male = 'male',
  female = 'female',
  other = 'other',
}

export enum CorporalFat {
  excellent = 'Excelente',
  good = 'Bueno',
  regular = 'Regular',
  bad = 'Malo',
  undefined = 'Indefinido',
}

export enum CorporalWaterPct {
  excellent = 'Excelente',
  good = 'Bueno',
  bad = 'Malo',
  undefined = 'Indefinido',
}

export enum BodyMassIndex {
  underWeight = 'Falta de peso',
  normalWeight = 'Peso normal',
  overWeight = 'Sobre peso',
  undefined = 'Indefinido',
}

export enum Calories {
  good = 'Bien',
  needsImprove = 'Necesita mejorar',
  undefined = 'Indefinido',
}

export enum Muscle {
  belowAverage = 'Poco',
  standard = 'Normal',
  highQuality = 'Mucho',
  undefined = 'Indefinido',
}

export enum Roles {
  'superAdmin' = 'superAdmin',
}

export const PATHS = {
  HOME: '/',
  CLASSES: '/classes',
  MEMBERS: '/members',
  MEMBER_DETAILS: '/members/*',
  CONFIGURATIONS: '/config',
  LOGIN: '/login',
  VISIT: '/visit',
  PROFILE: '/profile',
  EQUIPMENT: '/equipment',
};
