import { formatDateHHmmss } from "../../utils/dateUtils";
import { WrapEditor } from "./WrapEditor";
import PropTypes from "prop-types";
import { TextTimeDiff } from "./TextTimeDiff";
import { CFormInput } from '@coreui/react';

export const MLRecordEditor = ({ activity,
    update = async () => { },
    setRecord = () => { },
    record = null }) => {

    return <WrapEditor className="IntRecordEditor" name={activity.name} img={activity.img}
        onClick={async () => {
            const newRecord = { ...record, endTime: formatDateHHmmss(new Date()) }
            await update(newRecord);
        }}>
        <TextTimeDiff record={record}></TextTimeDiff>
        <div className="IntRecordEditor__container">
            <CFormInput
                type="number"
                min={0}
                max={1000}
                step={10}
                value={record.val}
                onChange={(event) => setRecord({ ...record, val: parseInt(event.target.value, 10) })}
            />
            <span className="IntRecordEditor__text">мл</span>
        </div>

    </WrapEditor>;
}

MLRecordEditor.propTypes = {
    activity: PropTypes.object.isRequired,
    update: PropTypes.func,
};
