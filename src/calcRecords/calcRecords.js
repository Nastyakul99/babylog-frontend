export function filterRecordByTimeRange(record, rangeStart, rangeEnd, strict = false) {
  const start = new Date(rangeStart);
  const end = new Date(rangeEnd);

  if (record.startTime && record.endTime) {
    const recordStart = new Date(record.startTime);
    const recordEnd = new Date(record.endTime);

    if(strict) {
      return recordStart < end && recordEnd > start;
    }
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

export function sumValInRange(records, rangeStart, rangeEnd) {
  const filteredRecords = filterRecordsByTimeRange(records, rangeStart, rangeEnd);
  const start = new Date(rangeStart);
  const end = new Date(rangeEnd);

  let totalVal = 0;

  filteredRecords.forEach(record => {
    const recordStart = new Date(record.startTime);
    const recordEnd = new Date(record.endTime);

    const effectiveStart = recordStart < start ? start : recordStart;
    const effectiveEnd = recordEnd > end ? end : recordEnd;

    const effectDiff = effectiveEnd - effectiveStart;
    const diff = recordEnd - recordStart;
    const percent = (effectDiff * 100) / diff;
    const val = (record.val ? record.val : 0) * percent / 100;
    totalVal += val;
  });

  return totalVal;
}

export function findUnfinished(records) {
  return records.filter(r => r.endTime === null);
}