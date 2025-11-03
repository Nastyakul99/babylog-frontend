import { Text } from "@vkontakte/vkui"
import { TimeRangeRecord } from "../../api/types/types";
import { useEffect, useState } from "react";
import { formatDateHHmmss } from "../../utils/dateUtils";
import { WrapEditor } from "./WrapEditor";
import PropTypes from "prop-types";
import { TextTimeDiff } from "./TextTimeDiff";

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

    return <WrapEditor name={activity.name} img={activity.img}
        onClick={async () => {
            await create(record);
            setSelectedActivity(null)
        }}>
        <TextTimeDiff record={record}></TextTimeDiff>
    </WrapEditor>;
}

TimeRangeEditor.propTypes = {
    activity: PropTypes.object.isRequired,
    babyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    create: PropTypes.func,
    setSelectedActivity: PropTypes.func,
};
