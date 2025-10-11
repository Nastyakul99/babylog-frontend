import { RecordItem } from "./RecordItem";
import { CountRecordItem } from "./CountRecordItem";
import { TextNoteRecordItem } from "./TextNoteRecordItem";
import { TYPE_ACTIVITY_RECORD } from "../../api/types/types";
import { MLRecordItem } from "./MLRecordItem";

export const RecordItemFactory = ({ type, ...props }) => {
    let recordItem;
    switch (type) {
        case TYPE_ACTIVITY_RECORD.COUNT_RECORD:
            recordItem = <CountRecordItem {...props} />;
            break;
        case TYPE_ACTIVITY_RECORD.TEXT_NOTE:
            recordItem = <TextNoteRecordItem {...props}></TextNoteRecordItem>;
            break;
        case TYPE_ACTIVITY_RECORD.ML_RECORD:
            recordItem = <MLRecordItem {...props}></MLRecordItem>;
            break;
        default:
            recordItem = <RecordItem {...props} />;
            break;
    }
    return recordItem;
}