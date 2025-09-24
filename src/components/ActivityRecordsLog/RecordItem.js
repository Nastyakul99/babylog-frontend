import { formatHHmmss } from "../../utils/formatDateHHmmss"
import { getTimeDiffUOM } from "../../utils/timeDiff"
import PropTypes from "prop-types";
import { Activity } from "../../api/types/types";

export const RecordItem = ({ record, activity, addInf = "" }) => {
    const start = new Date(record.startTime);

    const timeDiff = record.endTime ? `${getTimeDiffUOM(start, new Date(record.endTime))}, ` : "";

    return activity && <>{`${formatHHmmss(start)}, ${timeDiff}${activity.name} ${addInf}`}</>
        || <></>
}

RecordItem.propTypes = {
  record: PropTypes.object.isRequired,
  activity: PropTypes.instanceOf(Activity),
  addInf: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};