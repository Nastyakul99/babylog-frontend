import { useState, useEffect, useCallback } from "react";
import { ScreenSpinner } from "@vkontakte/vkui";
import { getActivityGroups } from "../api/activityGroups";
import { ActivityGroup } from "../api/types/types";

export const useActivityGroups = () => {
    const [activityGroups, setActivityGroups] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    const fetchData = useCallback(async () => {
        try {
            const fetchedGroups = await getActivityGroups();
            const newData = fetchedGroups?.map(g => new ActivityGroup({ ...g })) || [];
            setActivityGroups(newData);
            setPopout(null);
        } catch (error) {
            console.error('Не удалось загрузить группы активности:', error);
            setPopout(null);
            setActivityGroups([]);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [activityGroups, setActivityGroups, popout];
};