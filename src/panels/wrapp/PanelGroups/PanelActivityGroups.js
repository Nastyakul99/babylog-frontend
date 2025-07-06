import { useActivityGroups } from "../../../hooks/useActivityGroups"
import { PanelGroups } from "./PanelGroups"

export const PanelActivityGroups = ({ onClick }) => {
    return <PanelGroups header={'Активности'}
        onLoad={useActivityGroups}
        onClick={onClick}>
    </PanelGroups>
}