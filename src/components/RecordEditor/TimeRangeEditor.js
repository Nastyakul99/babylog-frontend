import { formatDateHHmmss } from "../../utils/dateUtils";
import { WrapEditor } from "./WrapEditor";
import PropTypes from "prop-types";
import { TextTimeDiff } from "./TextTimeDiff";

export const TimeRangeEditor = ({
    activity,
    update = async () => { },
    record = null }) => {

    return <WrapEditor name={activity.name} img={activity.img}
        onClick={async () => {
            const newRecord = { ...record, endTime: formatDateHHmmss(new Date()) }
            await update(newRecord);
        }}>
        <TextTimeDiff record={record}></TextTimeDiff>
    </WrapEditor>;
}

TimeRangeEditor.propTypes = {
    activity: PropTypes.object.isRequired,
    record: PropTypes.object
};
