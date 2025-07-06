import { PanelGroups } from "./PanelGroups"
import { useActivities } from "../../../hooks/useActivities"

export const PanelActivities = ({ groupId }) => {
    return <PanelGroups header={'#'}
        onLoad={useActivities}
        groupId={groupId}>
    </PanelGroups>
}