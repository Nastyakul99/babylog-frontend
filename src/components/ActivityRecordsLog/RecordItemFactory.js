import { RecordItem } from "./RecordItem";
import { CountRecordItem } from "./CountRecordItem";
import { TYPE_ACTIVITY_RECORD } from "../../api/types/types";

export const RecordItemFactory = ({ type, ...props }) => {
    let recordItem;
    switch (type) {
        case TYPE_ACTIVITY_RECORD.COUNT_RECORD:
            recordItem = <CountRecordItem {...props} />;
            break;
        default:
            recordItem = <RecordItem {...props} />;
            break;
    }
    return recordItem;
}