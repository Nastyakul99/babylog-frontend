import { PanelGroups } from "./PanelGroups"
import { useActivityGroup } from "../../../hooks/useActivityGroup"
import { useParams } from "@vkontakte/vk-mini-apps-router"
import PropTypes from "prop-types"
import { Activity } from "../../../api/types/types"
import { formatDateHHmmss } from "../../../utils/dateUtils"
import { activityRecordFactory } from "../../../api/types/types"
import { findUnfinished } from "../../../calcRecords/calcRecords"

export const PanelActivities = ({
    babyId,
    createRecord = async () => { },
    activities = [],
    records = [],
}) => {
    const { groupId } = useParams();
    const [group] = useActivityGroup(groupId);//TODO

    const onClick = async (activity) => {
        const now = formatDateHHmmss(new Date());
        const r = activityRecordFactory({
            type: activity.type,
            babyId: babyId,
            activityId: activity.id,
            startTime: now
        });
        await createRecord(r);
    }

    return (group && <PanelGroups header={group?.name}
        groups={activities}
        onClick={findUnfinished(records).length > 0 ? null : onClick}>
    </PanelGroups>) || <></>;
}

PanelActivities.propTypes = {
    babyId: PropTypes.number,
    createRecord: PropTypes.func,
    activities: PropTypes.arrayOf(PropTypes.instanceOf(Activity)),
    records: PropTypes.array,
};