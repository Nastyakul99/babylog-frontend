import { useState } from "react";
import { useEffect } from "react";
import { ScreenSpinner } from "@vkontakte/vkui";
import { getActivityGroupMetadata } from "../api/activityGroupMetadata";
import { ActivityGroupMetadata } from "../api/types/types";

export const useActivityGroupMetadata = () => {
    const [activityGroupMetadata, setActivityGroupMetadata] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    useEffect(() => {
        async function fetchData() {
            const fetchData = await getActivityGroupMetadata();
            const newData = fetchData?.map(g => new ActivityGroupMetadata({ ...g }));
            setActivityGroupMetadata(newData ? newData : []);
            setPopout(null);
        }
        fetchData();
    }, []);

    return [activityGroupMetadata, setActivityGroupMetadata, popout];
}