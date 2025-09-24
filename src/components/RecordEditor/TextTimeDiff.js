import { getTimeDiff } from "../../utils/timeDiff";
import { Text } from "@vkontakte/vkui";

export const TextTimeDiff = ({ record }) => {
    const getDiff = (record) => {
        if (record != null) {
            const start = new Date(record.startTime);
            const end = new Date(record.endTime);
            return getTimeDiff(start, end);
        }
        return "";
    }

    return <Text className="TextTimeDiff">{getDiff(record)}</Text>
}