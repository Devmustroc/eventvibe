const today = new Date();
const oneWeekFromToday = new Date();
oneWeekFromToday.setDate(today.getDate() + 7);

 export const initialDateRange = {
  startDate: today,
  endDate: oneWeekFromToday,
  key: 'selection'
};

 export const getNextMonth = (date: string) => {
  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth;
}
