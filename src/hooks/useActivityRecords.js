import { useState } from "react";
import { useEffect } from "react";
import { activityRecordFactory } from "../api/types/types";
import { ScreenSpinner } from "@vkontakte/vkui";
import {
    createRecord, getByBabyId,
    getByBabyIdAndGroupId, updateRecord, deleteRecord, getById
} from "../api/activityRecords";

export const useActivityRecords = ({ userId, babyId, groupId }) => {
    const [records, setRecords] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);
    console.log(records)

    async function refresh(fetchRecords) {
        const newRecords = fetchRecords?.map(b => activityRecordFactory(b));
        setRecords(newRecords);
        setPopout(null);
    }

    async function fetchData() {
        const get = groupId ? getByBabyIdAndGroupId : getByBabyId;
        const fetchRecords = (userId == null || babyId == null) ? [] : await get(userId, babyId, groupId);//TODO
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
            deleteRecord(userId, id).finally(() => fetchData());
        }
    }

    const update = async (record) => {
        const r = await updateRecord(userId, record);
        fetchData();
        return activityRecordFactory(r);
    }

    async function getByBabyAndGroup(groupId) {
        const fetchRecords = await getByBabyIdAndGroupId(userId, babyId, groupId);
        refresh(fetchRecords);
    }

    async function getByRecordId(id) {
        if (userId) {
            const r = await getById(userId, id);
            return activityRecordFactory(r);
        }
    }

    return [records, add, deleteRecords, update, getByBabyAndGroup, getByRecordId, fetchData, popout];
}