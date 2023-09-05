export const getDateAndTimeWithLimit = (
  date: Date,
  limit: 'min' | 'max'
): Date => {
  const newDate = new Date(date.getTime());
  const time = limit === 'max' ? [23, 59, 59] : [0, 0, 0];
  const [hour, min, sec] = time;
  newDate.setHours(hour);
  newDate.setMinutes(min);
  newDate.setSeconds(sec);

  return newDate;
};

/**
 * Get the Iso time of a date
 * @param date Always in yyyy-mm-dd
 */
export const getIsoTime = (date: string) => new Date(date).toISOString();
