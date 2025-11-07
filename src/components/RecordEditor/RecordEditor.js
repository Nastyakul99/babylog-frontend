import { TimeRangeEditor } from "./TimeRangeEditor";
import { TextNoteEditor } from "./TextNoteEditor";
import { BaseRecordEditor } from "./BaseRecordEditor";
import { CountRecordEditor } from "./CountRecordEditor";
import { TYPE_ACTIVITY_RECORD } from "../../api/types/types";
import { MLRecordEditor } from "./MLRecordEditor";
import PropTypes from 'prop-types';

export const RecordEditor = ({
    getActivityById = () => { },
    update = () => { },
    selectedRecord = null,
    setSelectedRecord = () => { } }) => {

    const activity = getActivityById(selectedRecord.activityId);

    const getEditor = () => {
        switch (activity.type) {
            case TYPE_ACTIVITY_RECORD.TIME_RANGE:
                return <TimeRangeEditor record={selectedRecord} setRecord={setSelectedRecord} activity={activity} update={update}>
                </TimeRangeEditor>;
            case TYPE_ACTIVITY_RECORD.TEXT_NOTE:
                return <TextNoteEditor record={selectedRecord} setRecord={setSelectedRecord} activity={activity} update={update}>
                </TextNoteEditor>;
            case TYPE_ACTIVITY_RECORD.BASE_RECORD:
                return <BaseRecordEditor record={selectedRecord} setRecord={setSelectedRecord} activity={activity} update={update}>
                </BaseRecordEditor>;
            case TYPE_ACTIVITY_RECORD.COUNT_RECORD:
                return <CountRecordEditor record={selectedRecord} setRecord={setSelectedRecord} activity={activity} update={update}>
                </CountRecordEditor>;
            case TYPE_ACTIVITY_RECORD.ML_RECORD:
                return <MLRecordEditor record={selectedRecord} setRecord={setSelectedRecord} activity={activity} update={update}>
                </MLRecordEditor>;
            default:
                return null;
        }
    }
    return activity && getEditor() || <></>;
}

RecordEditor.propTypes = {
    update: PropTypes.func,
    selectedRecord: PropTypes.object
};