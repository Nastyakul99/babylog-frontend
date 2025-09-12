import { useState } from "react";
import { useEffect } from "react";
import { ScreenSpinner } from "@vkontakte/vkui";
import { Activity } from "../api/types/types";
import { getActivitiesByGroupId, getActivities } from "../api/Activities";

export const useActivities = ({ groupId }) => {
    const [activities, setActivities] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    useEffect(() => {
        async function fetchData() {
            const get = groupId ? getActivitiesByGroupId : getActivities;
            const newData = (await get(groupId))
                .map(a => new Activity({ ...a }));
            setActivities(newData ? newData : []);
            setPopout(null);
        }
        fetchData();
    }, [groupId]);

    const getById = (id) => { return activities.find((a) => a.id === id) }

    return [activities, setActivities, popout, getById];
}