export function filterRecordByTimeRange(record, rangeStart, rangeEnd) {
  const start = new Date(rangeStart);
  const end = new Date(rangeEnd);

  if (record.startTime && record.endTime) {
    const recordStart = new Date(record.startTime);
    const recordEnd = new Date(record.endTime);

    return recordStart <= end && recordEnd >= start;
  }
  return false;
}

export function filterRecordsByTimeRange(records, rangeStart, rangeEnd) {
  return records.filter(record => filterRecordByTimeRange(record, rangeStart, rangeEnd));
}

export function countRecordsInTimeRange(records, rangeStart, rangeEnd) {
  const filteredRecords = filterRecordsByTimeRange(records, rangeStart, rangeEnd);
  return filteredRecords.length;
}

export function sumTimeInRange(records, rangeStart, rangeEnd) {
  const filteredRecords = filterRecordsByTimeRange(records, rangeStart, rangeEnd);
  const start = new Date(rangeStart);
  const end = new Date(rangeEnd);

  let totalMinutes = 0;

  filteredRecords.forEach(record => {
    const recordStart = new Date(record.startTime);
    const recordEnd = new Date(record.endTime);

    const effectiveStart = recordStart < start ? start : recordStart;
    const effectiveEnd = recordEnd > end ? end : recordEnd;

    const diffMinutes = (effectiveEnd - effectiveStart) / (1000 * 60);
    totalMinutes += diffMinutes;
  });

  return totalMinutes;
}

export function findUnfinished(records) {
  return records.filter(r => r.endTime === null);
}