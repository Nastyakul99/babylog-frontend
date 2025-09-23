import { Text } from "@vkontakte/vkui"
import { TimeRangeRecord } from "../../api/types/types";
import { useEffect, useState } from "react";
import { formatDateHHmmss } from "../../utils/formatDateHHmmss";
import { getTimeDiff } from "../../utils/timeDiff";
import { WrapEditor } from "./WrapEditor";
import PropTypes from "prop-types";

export const TimeRangeEditor = ({ activity, babyId,
    create = async () => { }, setSelectedActivity = () => { } }) => {
    const [record, setRecord] = useState(() => {
        const now = formatDateHHmmss(new Date());
        return new TimeRangeRecord({ babyId: babyId, activityId: activity.id, startTime: now });
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setRecord(prevRecord => {
                return { ...prevRecord, endTime: formatDateHHmmss(new Date()) }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getDiff = (record) => {
        if (record != null) {
            const start = new Date(record.startTime);
            const end = new Date(record.endTime);
            return getTimeDiff(start, end);
        }
        return "";
    }

    return <WrapEditor name={activity.name} img={activity.img}
        onClick={async () => {
            await create(record);
            setSelectedActivity(null)
        }}>
        <Text>{getDiff(record)}</Text>
    </WrapEditor>;
}

TimeRangeEditor.propTypes = {
    activity: PropTypes.object.isRequired,
    babyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    create: PropTypes.func,
    setSelectedActivity: PropTypes.func,
};
