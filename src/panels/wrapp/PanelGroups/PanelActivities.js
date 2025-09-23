import { PanelGroups } from "./PanelGroups"
import { useActivityGroup } from "../../../hooks/useActivityGroup"
import { RecordEditor } from "../../../components/RecordEditor/RecordEditor"
import { useState } from "react"
import { useParams } from "@vkontakte/vk-mini-apps-router"
import PropTypes from "prop-types"
import { Activity } from "../../../api/types/types"

export const PanelActivities = ({ babyId, createRecord = () => { }, activities = [] }) => {
    const { groupId } = useParams();
    const [group] = useActivityGroup(groupId);//TODO
    const [selectedActivity, setSelectedActivity] = useState(null);
    
    return (selectedActivity && <RecordEditor
        activity={selectedActivity} setSelectedActivity={setSelectedActivity} babyId={babyId} create={createRecord}>
    </RecordEditor>) || (group && <PanelGroups header={group?.name}
        groups={activities}
        onClick={setSelectedActivity}>
        </PanelGroups>) || <></>;
}

PanelActivities.propTypes = {
    babyId: PropTypes.number,
    createRecord: PropTypes.func,
    activities: PropTypes.arrayOf(PropTypes.instanceOf(Activity)),
};