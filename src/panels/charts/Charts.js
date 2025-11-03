import { useState } from 'react';
import PropTypes from 'prop-types';
import { Wrapp } from '../wrapp/Wrapp';
import { TimeRangeBarChart } from './TimeRangeBarChart';
import { DateRangeInput } from '@vkontakte/vkui';
import { getWeekStartAndEnd } from '../../utils/dateUtils';
import { getDatesArray, formatDate } from '../../utils/dateUtils';
import { PanelActivityGroups } from '../wrapp/PanelGroups/PanelActivityGroups';
import { useActivities } from '../../hooks/useActivities';
import "./Charts.css"

export const Charts = ({
    id,
    babies = [],
    selectedBaby = null,
    onChangeBaby = () => { },
    groups = [],
    records = [],
    ...props }) => {

    const [date, setDate] = useState(getWeekStartAndEnd(new Date()));
    const [groupId, setGroupId] = useState();
    const [activities] = useActivities({ groupId });

    const onGroupClick = (group) => {
        if (group && group.id && selectedBaby) {
            setGroupId(group.id);
        }
    }

    return (
        <Wrapp
            id={id} babies={babies} selectedBaby={selectedBaby} onChangeBaby={onChangeBaby} {...props}
            content={<div>
                <DateRangeInput value={date} onChange={setDate} accessible />
                <TimeRangeBarChart
                    activities={activities}
                    records={records}
                    text='Режим'
                    dates={getDatesArray(...date).map(d => formatDate(d))}>
                </TimeRangeBarChart>
            </div>}>
            <PanelActivityGroups groups={groups} onClick={onGroupClick}></PanelActivityGroups>
        </Wrapp>
    );
};

Charts.propTypes = {
    id: PropTypes.string.isRequired,
    babies: PropTypes.array,
    selectedBaby: PropTypes.object,
    onChangeBaby: PropTypes.func,
    groups: PropTypes.array,
};