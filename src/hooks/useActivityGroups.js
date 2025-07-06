import { useState } from "react";
import { useEffect } from "react";
import { ScreenSpinner } from "@vkontakte/vkui";
import { getActivityGroups } from "../api/activityGroups";
import { ActivityGroup } from "../api/types/types";

export const useActivityGroups = () => {
    const [activityGroups, setActivityGroups] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    useEffect(() => {
        async function fetchData() {
            const fetchData = await getActivityGroups();
            const newData = fetchData?._embedded?.activityGroups
                .map(g => new ActivityGroup({ ...g }));
            setActivityGroups(newData ? newData : []);
            setPopout(null);
        }
        fetchData();
    }, []);

    return [activityGroups, setActivityGroups, popout];
}