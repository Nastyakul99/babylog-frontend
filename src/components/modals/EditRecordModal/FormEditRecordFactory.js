import { TYPE_ACTIVITY_RECORD } from "../../../api/types/types";
import { TimeRangeFormRecord } from "./TimeRangeFormRecord";
import { TextNoteFormRecord } from "./TextNoteFormRecord";
import { CountFormRecord } from "./CountFormRecord";
import { MLFormRecord } from "./MLFormRecord";

export const FormEditRecordFactory = ({ type, ...props }) => {
    let form;
    switch (type) {
        case TYPE_ACTIVITY_RECORD.TIME_RANGE:
            form = <TimeRangeFormRecord {...props} />;
            break;
        case TYPE_ACTIVITY_RECORD.TEXT_NOTE:
            form = <TextNoteFormRecord {...props}></TextNoteFormRecord>;
            break;
        case TYPE_ACTIVITY_RECORD.COUNT_RECORD:
            form = <CountFormRecord {...props}></CountFormRecord>;
            break;
        case TYPE_ACTIVITY_RECORD.ML_RECORD:
            form = <MLFormRecord {...props}></MLFormRecord>;
            break;
        default:
            form = <></>;
            break;
    }
    return form;
}