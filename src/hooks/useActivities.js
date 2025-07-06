import { useState } from "react";
import { useEffect } from "react";
import { ScreenSpinner } from "@vkontakte/vkui";
import { Activity } from "../api/types/types";
import { getActivitiesByGroupId } from "../api/Activities";

export const useActivities = ({ groupId }) => {
    const [activities, setActivities] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    useEffect(() => {
        async function fetchData() {
            const newData = (await getActivitiesByGroupId(groupId))
                .map(a => new Activity({ ...a }));
            setActivities(newData ? newData : []);
            setPopout(null);
        }
        fetchData();
    }, []);

    return [activities, setActivities, popout];
}