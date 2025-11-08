import "./TextNoteEditor.css"
import { Textarea } from "@vkontakte/vkui"
import { formatDateHHmmss } from "../../utils/dateUtils";
import { WrapEditor } from "./WrapEditor";
import PropTypes from "prop-types";

export const TextNoteEditor = ({
    activity,
    update = async () => { },
    record = null,
    setRecord = () => { } }) => {

    return <WrapEditor name={activity.name} img={activity.img}
        onClick={async () => {
            const newRecord = { ...record, endTime: formatDateHHmmss(new Date()) }
            await update(newRecord);
        }}>
        <Textarea className={"TextNoteEditor__Textarea"}
            value={record.comment}
            onChange={(event) => setRecord({ ...record, comment: event.target.value })}></Textarea>
    </WrapEditor>;
}

TextNoteEditor.propTypes = {
    activity: PropTypes.object.isRequired,
    update: PropTypes.func,
};
