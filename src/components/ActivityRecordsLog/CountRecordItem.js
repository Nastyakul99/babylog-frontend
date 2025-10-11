import { RecordItem } from "./RecordItem"
import PropTypes from "prop-types";
import { Activity } from "../../api/types/types";

export const CountRecordItem = ({ record, activity, ...props }) => {
    return <RecordItem record={record} activity={activity} addInf={`пробуждений: ${record.val}`} {...props}></RecordItem>
}

CountRecordItem.propTypes = {
  record: PropTypes.object.isRequired,
  activity: PropTypes.instanceOf(Activity),
};