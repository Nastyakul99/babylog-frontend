import { ActivityRecord } from "../../api/types/types";
import { useEffect } from "react";
import { formatDateHHmmss } from "../../utils/formatDateHHmmss";
import { WrapEditor } from "./WrapEditor";
import PropTypes from "prop-types";

export const BaseRecordEditor = ({ activity, babyId,
    create = async () => { }, setSelectedActivity = () => { } }) => {

    useEffect(() => {
        async function createRecord() {
            const now = formatDateHHmmss(new Date());
            const record = new ActivityRecord({ babyId: babyId, activityId: activity.id, startTime: now });
            await create(record);
            setSelectedActivity(null)
        }
        createRecord();
    }, []);

    return <WrapEditor name={activity.name} img={activity.img}></WrapEditor>;
}

BaseRecordEditor.propTypes = {
  activity: PropTypes.object.isRequired,
  babyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  create: PropTypes.func,
  setSelectedActivity: PropTypes.func,
};