import { useState, useEffect, useCallback } from "react";
import { ScreenSpinner } from "@vkontakte/vkui";
import { Activity } from "../api/types/types";
import { getActivitiesByGroupId, getActivities } from "../api/Activities";

export const useActivities = ({ groupId }) => {
    const [activities, setActivities] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    const fetchData = useCallback(async () => {
        try {
            const get = groupId ? getActivitiesByGroupId : getActivities;
            const fetchedActivities = await get(groupId);
            const newData = fetchedActivities?.map(a => new Activity({ ...a })) || [];
            setActivities(newData);
            setPopout(null);
        } catch (error) {
            console.error('Не удалось загрузить активности:', error);
            setPopout(null);
            setActivities([]);
        }
    }, [groupId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getById = useCallback((id) => {
        return activities.find((a) => a.id === id);
    }, [activities]);

    return [activities, setActivities, popout, getById];
};