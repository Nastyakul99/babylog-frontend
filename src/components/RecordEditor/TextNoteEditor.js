import "./TextNoteEditor.css"
import { Textarea } from "@vkontakte/vkui"
import { TextNoteRecord } from "../../api/types/types";
import { useState } from "react";
import { formatDateHHmmss } from "../../utils/dateUtils";
import { WrapEditor } from "./WrapEditor";
import PropTypes from "prop-types";

export const TextNoteEditor = ({ activity, babyId,
    create = async () => { }, setSelectedActivity = () => { } }) => {
    const [record, setRecord] = useState(() => {
        const now = formatDateHHmmss(new Date());
        return new TextNoteRecord({ babyId: babyId, activityId: activity.id, startTime: now });
    });

    return <WrapEditor name={activity.name} img={activity.img}
        onClick={async () => {
            await create(record);
            setSelectedActivity(null)
        }}>
        <Textarea className={"TextNoteEditor__Textarea"}
        value={record.comment}
            onChange={(event) => setRecord((prev) => ({ ...prev, comment: event.target.value }))}></Textarea>
    </WrapEditor>;
}

TextNoteEditor.propTypes = {
  activity: PropTypes.object.isRequired,
  babyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  create: PropTypes.func,
  setSelectedActivity: PropTypes.func,
};
