export const isDateWithinDays = (dateString: Date, daysCount: number): boolean => {
  const currentDate: Date = new Date();
  const dateToCompare: Date = new Date(dateString);

  const differenceInTime: number = currentDate.getTime() - dateToCompare.getTime();
  const differenceInDays: number = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays < daysCount;
};
