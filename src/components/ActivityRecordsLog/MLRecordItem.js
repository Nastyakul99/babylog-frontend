import { RecordItem } from "./RecordItem"
import PropTypes from "prop-types";
import { Activity } from "../../api/types/types";

export const MLRecordItem = ({ record, activity, ...props }) => {
    return <RecordItem record={record} activity={activity} addInf={`мл: ${record.val}`} {...props}></RecordItem>
}

MLRecordItem.propTypes = {
  record: PropTypes.object.isRequired,
  activity: PropTypes.instanceOf(Activity),
};