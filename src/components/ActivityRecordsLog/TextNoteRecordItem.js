import { RecordItem } from "./RecordItem"
import PropTypes from "prop-types";
import { Activity } from "../../api/types/types";

export const TextNoteRecordItem = ({ record, activity, ...props }) => {
    return <RecordItem record={record} activity={activity} addInf={`${record.comment}`} {...props}></RecordItem>
}

TextNoteRecordItem.propTypes = {
  record: PropTypes.object.isRequired,
  activity: PropTypes.instanceOf(Activity),
};