import { IntegerAndTimeRange, TYPE_ACTIVITY_RECORD } from "../../api/types/types";
import { useState, useEffect } from "react";
import { formatDateHHmmss } from "../../utils/dateUtils";
import { WrapEditor } from "./WrapEditor";
import PropTypes from "prop-types";
import { TextTimeDiff } from "./TextTimeDiff";
import { CFormInput } from '@coreui/react';

export const CountRecordEditor = ({ activity, babyId,
    create = async () => { }, setSelectedActivity = () => { } }) => {
    const [record, setRecord] = useState(() => {
        const now = formatDateHHmmss(new Date());
        return new IntegerAndTimeRange({
            babyId: babyId, activityId: activity.id,
            startTime: now, type: TYPE_ACTIVITY_RECORD.COUNT_RECORD
        });
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setRecord(prevRecord => {
                return { ...prevRecord, endTime: formatDateHHmmss(new Date()) }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return <WrapEditor className="IntRecordEditor" name={activity.name} img={activity.img}
        onClick={async () => {
            await create(record);
            setSelectedActivity(null)
        }}>
        <TextTimeDiff record={record}></TextTimeDiff>
        <div className="IntRecordEditor__container">
            <span className="IntRecordEditor__text">пробуждений:</span>
            <CFormInput
                type="number"
                min={0}
                max={100}
                step={1}
                value={record.val}
                onChange={(event) => setRecord((prev) => ({ ...prev, val: parseInt(event.target.value, 10) }))}
            />
        </div>

    </WrapEditor>;
}

CountRecordEditor.propTypes = {
    activity: PropTypes.object.isRequired,
    babyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    create: PropTypes.func,
    setSelectedActivity: PropTypes.func,
};
