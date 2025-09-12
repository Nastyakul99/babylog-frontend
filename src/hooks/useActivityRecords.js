import { useState } from "react";
import { useEffect } from "react";
import { ActivityRecord, activityRecordFactory } from "../api/types/types";
import { ScreenSpinner } from "@vkontakte/vkui";
import {createRecord, getByBabyId,
    getByBabyIdAndGroupId, updateRecord, deleteRecord
} from "../api/activityRecords";

export const useActivityRecords = ({ userId, babyId, groupId }) => {
    const [records, setRecords] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);


    async function refresh(fetchRecords) {
        //TODO исправить
        const newRecords = fetchRecords?.map(b => activityRecordFactory(b));
        setRecords(newRecords);
        setPopout(null);
    }

    async function fetchData() {
        const get = groupId ? getByBabyIdAndGroupId : getByBabyId;
        const fetchRecords = await get(userId, babyId, groupId);
        refresh(fetchRecords);
    }

    useEffect(() => {
        fetchData();
    }, [userId, babyId, groupId]);

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

    async function get(groupId) {
        const fetchRecords = await getByBabyIdAndGroupId(userId, babyId, groupId);
        refresh(fetchRecords);
    }

    return [records, add, deleteRecords, update, get, fetchData, popout];
}