import { PanelGroups } from "./PanelGroups"
import { ActivityGroup } from "../../../api/types/types"
import PropTypes from "prop-types"

export const PanelActivityGroups = ({ onClick = () => { }, groups = [] }) => {
    return <PanelGroups header={'Активности'}
        groups={groups}
        onClick={onClick}>
    </PanelGroups>
}

PanelActivityGroups.propTypes = {
    onClick: PropTypes.func,
    groups: PropTypes.arrayOf(PropTypes.instanceOf(ActivityGroup)),
};