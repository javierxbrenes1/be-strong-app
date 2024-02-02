import dayjs, { Dayjs } from 'dayjs';
import { DAYS } from '../labels';
import GymClassTime from '../../common/models/GymClassTime';
import MemberAttendance from '../../common/models/MemberAttendance';
import { MemberCategories } from '../types';

export const parseIsoTimeToDate = (
  isoTime: string,
  asDayJs?: boolean
): dayjs.Dayjs | Date => {
  const dateAsString = `1971-01-01${isoTime}`;
  if (asDayJs) {
    return dayjs(dateAsString);
  }
  return new Date(dateAsString);
};

export function formatIsoTime(isoTime: string) {
  const date = parseIsoTimeToDate(isoTime, true);
  return (date as Dayjs).format('hh:mm A');
}

export const sortIsoTimes = (a: string, b: string) => {
  const date1 = parseIsoTimeToDate(a) as Date;
  const date2 = parseIsoTimeToDate(b) as Date;
  const hoursAndMinutesA = date1.getHours() * 60 + date1.getMinutes();
  const hoursAndMinutesB = date2.getHours() * 60 + date2.getMinutes();
  if (hoursAndMinutesA < hoursAndMinutesB) {
    return -1;
  }
  if (hoursAndMinutesA > hoursAndMinutesB) {
    return 1;
  }
  return 0;
};

export const getGymClassTimeForUI = (gymClassTime?: GymClassTime) => {
  if (!gymClassTime) return '';
  const { isoTime } = gymClassTime;
  const date = parseIsoTimeToDate(isoTime, true) as dayjs.Dayjs;
  return date.format('hh:mm A');
};

export const getClassAttendanceForUI = (
  memberAttendance?: MemberAttendance,
  asValue?: boolean
) => {
  if (!memberAttendance) return [];

  const { memberCode, ...days } = memberAttendance;
  const attendance: string[] = [];
  Object.keys(days).forEach((day) => {
    if (day !== '__typename' && days[day as keyof typeof days]) {
      if (!asValue) {
        attendance.push(DAYS[day as keyof typeof DAYS]);
      } else {
        attendance.push(day);
      }
    }
  });
  return attendance;
};

export const memberStateOptions = [
  {
    value: 'true',
    label: 'Activo',
  },
  {
    value: 'false',
    label: 'Inactivo',
  },
];

export const memberCategoriesOptions = Object.entries(MemberCategories).map(
  ([key, value]) => ({
    value,
    label: key,
  })
);

export const genreOptions = [
  {
    value: 'male',
    label: 'Masculino',
  },
  {
    value: 'female',
    label: 'Femenino',
  },
  {
    value: 'other',
    label: 'Otro',
  },
];

export const daysOptions = Object.entries(DAYS).reduce<
  { value: string; label: string }[]
>((curr, entry) => {
  const [value, label] = entry;
  return [...curr, { value, label }];
}, []);
