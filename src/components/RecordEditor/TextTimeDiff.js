import { useState, useEffect } from "react";
import { getTimeDiff } from "../../utils/timeDiff";
import { Text } from "@vkontakte/vkui";

const getDiff = (record) => {
    if (record != null) {
        const start = new Date(record.startTime);
        const end = record.endTime ? new Date(record.endTime) : new Date();
        return getTimeDiff(start, end);
    }
    return "";
}

export const TextTimeDiff = ({ record }) => {
    const [diff, setDiff] = useState(getDiff(record));

    useEffect(() => {
        const interval = setInterval(() => {
            setDiff(getDiff(record));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <Text className="TextTimeDiff">{diff}</Text>
}