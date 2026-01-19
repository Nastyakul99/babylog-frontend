import { useState, useEffect } from 'react';
import { findUnfinished } from '../calcRecords/calcRecords';

export const useUnfinishedRecords = (records) => {
  const [unfinishedRecords, setUnfinishedRecords] = useState([]);

  useEffect(() => {
    const unfinished = findUnfinished(records);
    setUnfinishedRecords(unfinished.length > 0 ? unfinished : []);
  }, [records]);

  const setUnfinishedRecord = (record) => {
    setUnfinishedRecords(prevRecords => 
      prevRecords.map(r => r.id === record.id ? record : r)
    );
  };

  return [unfinishedRecords, setUnfinishedRecord];
};
