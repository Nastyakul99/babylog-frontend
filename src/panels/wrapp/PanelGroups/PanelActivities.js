import { PanelGroups } from "./PanelGroups"
import { useActivities } from "../../../hooks/useActivities"
import { useActivityGroup } from "../../../hooks/useActivityGroup"

export const PanelActivities = ({ groupId }) => {
    const [group] = useActivityGroup(groupId);

    return <PanelGroups header={group?.name}
        onLoad={useActivities}
        groupId={groupId}>
    </PanelGroups>
}