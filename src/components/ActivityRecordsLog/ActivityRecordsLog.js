import { formatDayMonthName } from "../../utils/dateUtils";
import { Group } from "@vkontakte/vkui";
import { ImageUL } from "../ImageUL/ImageUL";
import PropTypes from 'prop-types';
import { RecordItemFactory } from "./RecordItemFactory";
import { getTimeDiffUOM } from "../../utils/timeDiff";
import "./ActivityRecordsLog.css"

export const ActivityRecordsLog = ({ getActivityById = () => { }, records = [],
    deleteRecords = async () => { } }) => {
    const finishedRecords = records.filter(r => !(r.endTime === null));

    const sortByStartTimeDesc = (a, b) => new Date(b.startTime) - new Date(a.startTime);

    const uniqueDates = Array.from(
        new Set([...finishedRecords].sort(sortByStartTimeDesc)
            .map(r => formatDayMonthName(new Date(r.startTime))))
    );

    const getDiff = (array, index) => {
        if (index < array.length - 1) {
            return getTimeDiffUOM(new Date(array[index + 1].startTime),
                new Date(array[index].startTime));
        }
        return "";
    }

    const getRecordsByDate = (date) => {
        const sortRecords = finishedRecords.filter(r => formatDayMonthName(new Date(r.startTime)) === date)
            .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        return sortRecords
            .map((r, index) => {
                const activity = getActivityById(r.activityId);
                return {
                    id: r.id,
                    data: <RecordItemFactory
                        type={r.type}
                        activity={activity}
                        record={r}
                        deleteRecords={deleteRecords} />,
                    img: activity?.img,
                    contentBetween: `'${getDiff(sortRecords, index)}'`
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
        <Group className="ActivityRecordsLog" mode="plain">
            <ImageUL list={list}></ImageUL>
        </Group>
    );
}

ActivityRecordsLog.propTypes = {
    getActivityById: PropTypes.func,
    records: PropTypes.array,
};