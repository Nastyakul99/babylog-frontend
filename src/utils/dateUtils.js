export const formatDateHHmmss = (date) => {
  return date.toISOString();
}

export const formatDayMonthName = (date) => {
  return new Intl.DateTimeFormat('ru', {
    weekday: 'short',
    year: '2-digit',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export const formatHHmmss = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
};

export const getDayStartEnd = (dateString) => {
  const date = new Date(dateString);

  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  return [startOfDay.toISOString(), endOfDay.toISOString()];
}

export const isSameDay = (dateStr1, dateStr2) => {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}

export const updateDate = (originalDateStr, dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const originalDate = new Date(originalDateStr);

  const newDate = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      originalDate.getUTCHours(),
      originalDate.getUTCMinutes(),
      originalDate.getUTCSeconds(),
      originalDate.getUTCMilliseconds()
    )
  );

  return newDate.toISOString();
}

export const getWeekStartAndEnd = (date) => {
  const inputDate = new Date(date);
  const day = inputDate.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const weekStart = new Date(inputDate);
  weekStart.setDate(inputDate.getDate() + diffToMonday);
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  return [ weekStart, weekEnd ];
}

export const getDatesArray = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};