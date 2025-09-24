import { TimeRangeEditor } from "./TimeRangeEditor";
import { TextNoteEditor } from "./TextNoteEditor";
import { BaseRecordEditor } from "./BaseRecordEditor";
import { CountRecordEditor } from "./CountRecordEditor";
import { TYPE_ACTIVITY_RECORD } from "../../api/types/types";
import { MLRecordEditor } from "./MLRecordEditor";
import PropTypes from 'prop-types';

export const RecordEditor = ({ activity = null, babyId,
    create = () => { }, setSelectedActivity = () => { } }) => {

    const getEditor = () => {
        switch (activity.type) {
            case TYPE_ACTIVITY_RECORD.TIME_RANGE:
                return <TimeRangeEditor activity={activity}
                    babyId={babyId} create={create} setSelectedActivity={setSelectedActivity}>
                </TimeRangeEditor>;
            case TYPE_ACTIVITY_RECORD.TEXT_NOTE:
                return <TextNoteEditor activity={activity}
                    babyId={babyId} create={create} setSelectedActivity={setSelectedActivity}>
                </TextNoteEditor>;
            case TYPE_ACTIVITY_RECORD.BASE_RECORD:
                return <BaseRecordEditor activity={activity}
                    babyId={babyId} create={create} setSelectedActivity={setSelectedActivity}>
                </BaseRecordEditor>;
            case TYPE_ACTIVITY_RECORD.COUNT_RECORD:
                return <CountRecordEditor activity={activity}
                    babyId={babyId} create={create} setSelectedActivity={setSelectedActivity}>
                </CountRecordEditor>;
            case TYPE_ACTIVITY_RECORD.ML_RECORD:
                return <MLRecordEditor activity={activity}
                    babyId={babyId} create={create} setSelectedActivity={setSelectedActivity}>
                </MLRecordEditor>;
            default:
                return null;
        }
    }

    return activity && getEditor() || <></>;
}

RecordEditor.propTypes = {
    activity: PropTypes.object.isRequired,
    babyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    create: PropTypes.func,
    setSelectedActivity: PropTypes.func,
};