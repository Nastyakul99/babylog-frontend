import { useState, useEffect, useCallback } from "react";
import { activityRecordFactory } from "../api/types/types";
import { ScreenSpinner } from "@vkontakte/vkui";
import {
    createRecord, getByBabyId,
    getByBabyIdAndGroupId, updateRecord, deleteRecord, getById
} from "../api/activityRecords";

export const useActivityRecords = ({ userId, babyId, groupId }) => {
    const [records, setRecords] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    const refresh = useCallback((fetchRecords) => {
        const newRecords = fetchRecords?.map(b => activityRecordFactory(b)) || [];
        setRecords(newRecords);
        setPopout(null);
    }, []);

    const fetchData = useCallback(async () => {
        if (userId == null || babyId == null) {
            setRecords([]);
            setPopout(null);
            return;
        }

        try {
            const get = groupId ? getByBabyIdAndGroupId : getByBabyId;
            const fetchRecords = await get(userId, babyId, groupId);
            refresh(fetchRecords);
        } catch (error) {
            console.error('Не удалось загрузить записи активности:', error);
            setPopout(null);
            setRecords([]);
        }
    }, [userId, babyId, groupId, refresh]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const add = useCallback(async (newRecord) => {
        await createRecord(userId, newRecord);
        return fetchData();
    }, [userId, fetchData]);

    const deleteRecords = useCallback(async (deletedIds) => {
        try {
            await Promise.all(deletedIds.map(id => deleteRecord(userId, id)));
            await fetchData();
        } catch (error) {
            console.error('Не удалось удалить записи:', error);
            throw error;
        }
    }, [userId, fetchData]);

    const update = useCallback(async (record) => {
        try {
            const r = await updateRecord(userId, record);
            await fetchData();
            return activityRecordFactory(r);
        } catch (error) {
            console.error('Не удалось обновить запись:', error);
            throw error;
        }
    }, [userId, fetchData]);

    const getByBabyAndGroup = useCallback(async (groupId) => {
        if (userId == null || babyId == null) return;
        try {
            const fetchRecords = await getByBabyIdAndGroupId(userId, babyId, groupId);
            refresh(fetchRecords);
        } catch (error) {
            console.error('Не удалось загрузить записи по малышу и группе:', error);
        }
    }, [userId, babyId, refresh]);

    const getByRecordId = useCallback(async (id) => {
        if (!userId) return null;
        try {
            const r = await getById(userId, id);
            return activityRecordFactory(r);
        } catch (error) {
            console.error('Не удалось получить запись по id:', error);
            throw error;
        }
    }, [userId]);

    return [records, add, deleteRecords, update, getByBabyAndGroup, getByRecordId, fetchData, popout];
};