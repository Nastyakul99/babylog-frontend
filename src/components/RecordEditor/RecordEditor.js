import { TimeRangeEditor } from "./TimeRangeEditor";
import { TextNoteEditor } from "./TextNoteEditor";
import { BaseRecordEditor } from "./BaseRecordEditor";
import { TYPE_ACTIVITY_RECORD } from "../../api/types/types";
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
            default:
                return null;
        }
    }

    return activity && getEditor() || <></>;
}

RecordEditor.propTypes = {
  activity: PropTypes.array.isRequired,
  babyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  create: PropTypes.func,
  setSelectedActivity: PropTypes.func,
};