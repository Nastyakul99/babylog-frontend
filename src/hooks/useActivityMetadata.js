import { useState } from "react";
import { useEffect } from "react";
import { ScreenSpinner } from "@vkontakte/vkui";
import { getActivityMetadata } from "../api/activityMetadata";
import { ActivityMetadata } from "../api/types/types";

export const useActivityMetadata = () => {
    const [activityMetadata, setActivityMetadata] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    useEffect(() => {
        async function fetchData() {
            const fetchData = await getActivityMetadata();
            const newData = fetchData?.map(g => new ActivityMetadata({ ...g }));
            setActivityMetadata(newData ? newData : []);
            setPopout(null);
        }
        fetchData();
    }, []);

    return [activityMetadata, setActivityMetadata, popout];
}