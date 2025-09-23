import { formatDayMonthName } from "../../utils/formatDateHHmmss";
import { RecordItem } from "./RecordItem";
import { Group } from "@vkontakte/vkui";
import { ImageUL } from "../ImageUL/ImageUL";
import PropTypes from 'prop-types';

export const ActivityRecordsLog = ({ getActivityById = () => { }, records = [] }) => {
    const uniqueDates = Array.from(
        new Set(records.map(r => formatDayMonthName(new Date(r.startTime))))
    ).sort((a, b) => new Date(b) - new Date(a));

    const getRecordsByDate = (date) => {
        return records
            .filter(r => formatDayMonthName(new Date(r.startTime)) === date)
            .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
            .map(r => {
                const activity = getActivityById(r.activityId);
                return {
                    id: r.id,
                    data: <RecordItem activity={activity} record={r} />,
                    img: activity?.img
                };
            });
    };

    const list = uniqueDates.map(date => ({
        id: date,
        data: (
            <>
                {date}
                <ImageUL list={getRecordsByDate(date)} />
            </>)
    }));

    return (
        <Group>
            <ImageUL list={list}></ImageUL>
        </Group>
    );
}

ActivityRecordsLog.propTypes = {
    getActivityById: PropTypes.func,
    records: PropTypes.array,
};