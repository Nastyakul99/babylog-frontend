import { useState } from 'react';
import PropTypes from 'prop-types';
import { Wrapp } from '../wrapp/Wrapp';
import { DateRangeInput } from '@vkontakte/vkui';
import { getWeekStartAndEnd } from '../../utils/dateUtils';
import { getDatesArray, formatDate } from '../../utils/dateUtils';
import { PanelActivityGroups } from '../wrapp/PanelGroups/PanelActivityGroups';
import { useActivities } from '../../hooks/useActivities';
import "./Charts.css";
import { useActivityGroupMetadata } from '../../hooks/useActivityGroupMetadata';
import { useActivityMetadata } from '../../hooks/useActivityMetadata';
import { ChartFactory } from './ChartFactory';
import { StatisticCard } from './StatisticCard';

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
    const [activityGroupMetadata] = useActivityGroupMetadata();
    const [activityMetadata] = useActivityMetadata();

    const onGroupClick = (group) => {
        if (group && group.id && selectedBaby) {
            setGroupId(group.id);
        }
    }

    let charts = {}

    for (const am of activityMetadata) {
        if (charts[am.statisticType] === undefined) {
            charts[am.statisticType] = {}
        }
        if (charts[am.statisticType][am.name] === undefined) {
            charts[am.statisticType][am.name] = [];
        }
        let act = activities.find(a => a.id === am.activityId);
        if (act !== undefined) {
            charts[am.statisticType][am.name].push({ ...act, color: am.color })
        }
    }

    const dates = getDatesArray(...date).map(d => formatDate(d));

    let printCharts = [];
    Object.keys(charts).forEach(charts_key => {
        Object.keys(charts[charts_key]).forEach(key => {
            if (charts[charts_key][key].length > 0) {
                printCharts.push(<ChartFactory type={charts_key}
                    activities={charts[charts_key][key]}
                    records={records}
                    text={key}
                    dates={dates}>
                </ChartFactory>)
            }
        });
    });

    return (
        <Wrapp
            id={id} babies={babies} selectedBaby={selectedBaby} onChangeBaby={onChangeBaby} {...props}
            content={<div>
                <DateRangeInput value={date} onChange={setDate} accessible />
                <StatisticCard data={charts} dates={dates} records={records}></StatisticCard>
                {printCharts}
            </div>}>
            <PanelActivityGroups groups={groups.filter(g => activityGroupMetadata
                .some(obj => obj.activityGroupId === g.id))} onClick={onGroupClick}></PanelActivityGroups>
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