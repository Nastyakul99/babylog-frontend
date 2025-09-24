import { RecordItem } from "./RecordItem"
import PropTypes from "prop-types";
import { Activity } from "../../api/types/types";

export const CountRecordItem = ({ record, activity }) => {
    return <RecordItem record={record} activity={activity} addInf={`, пробуждений: ${record.val}`}></RecordItem>
}

CountRecordItem.propTypes = {
  record: PropTypes.object.isRequired,
  activity: PropTypes.instanceOf(Activity),
};