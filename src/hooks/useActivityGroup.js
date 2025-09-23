import { useState } from "react";
import { useEffect } from "react";
import { ScreenSpinner } from "@vkontakte/vkui";
import { getActivityGroup } from "../api/activityGroups";
import { ActivityGroup } from "../api/types/types";

export const useActivityGroup = (groupId) => {
    const [group, setGroup] = useState();
    const [popout, setPopout] = useState(<ScreenSpinner />);

    useEffect(() => {
        async function fetchData() {
            const fetchData = await getActivityGroup(groupId);
            setGroup(new ActivityGroup({ ...fetchData }));
            setPopout(null);
        }
        fetchData();
    }, []);

    return [group, setGroup, popout];
}