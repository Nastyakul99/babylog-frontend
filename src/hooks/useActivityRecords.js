import { useState } from "react";
import { useEffect } from "react";
import { ActivityRecord } from "../api/types/types";
import { ScreenSpinner } from "@vkontakte/vkui";
import {createRecord, getByBabyId,
    getByBabyIdAndActivityId, updateRecord, deleteRecord
} from "../api/activityRecords";

export const useActivityRecords = ({ userId, babyId }) => {
    const [records, setRecords] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    async function refresh(fetchRecords) {
        //TODO исправить
        const newRecords = fetchRecords?.map(b => new ActivityRecord(b));
        setRecords(newRecords);
        setPopout(null);
    }

    async function fetchData() {
        const fetchRecords = await getByBabyId(userId, babyId);
        refresh(fetchRecords);
    }

    useEffect(() => {
        fetchData();
    }, [userId, babyId]);

    const add = async (newRecord) => {
        await createRecord(userId, newRecord);
        return fetchData()
    }

    const deleteRecords = async (deletedIds) => {
        for (const id of deletedIds) {
            const fetchRecords = await deleteRecord(userId, id);
            refresh(fetchRecords);
        }
    }

    const update = async (record) => {
        const r = await updateRecord(userId, record);
        //TODO исправить
        return new ActivityRecord(r);
    }

    async function get(activityId) {
        const fetchRecords = await getByBabyIdAndActivityId(userId, babyId, activityId);
        refresh(fetchRecords);
    }

    return [records, add, deleteRecords, update, get, popout];
}