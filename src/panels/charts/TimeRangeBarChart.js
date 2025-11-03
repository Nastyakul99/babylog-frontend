import { filterRecordByTimeRange } from '../../calcRecords/calcRecords';
import { getDayStartEnd } from '../../utils/dateUtils';
import { isSameDay } from '../../utils/dateUtils';
import { updateDate } from '../../utils/dateUtils';
import { formatHHmmss } from '../../utils/dateUtils';
import PropTypes from 'prop-types';

import {
    Chart as ChartJS,
    CategoryScale,
    TimeScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

ChartJS.register(
    CategoryScale,
    TimeScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const TimeRangeBarChart = ({
    text = "",
    activities = [],
    records = [],
    dates = [],
    ...props }) => {

    const FAKE_DATE = "2025-01-01";
    const [fakeStart, fakeEnd] = getDayStartEnd(FAKE_DATE);

    const printTooltipLabel = (context) => {
        const [s, e] = context.raw.y;
        return `${formatHHmmss(new Date(s))} - ${formatHHmmss(new Date(e))}`;
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: text,
            },
            tooltip: {
                callbacks: {
                    label: printTooltipLabel,
                }
            }
        },
        scales: {
            y: {
                type: 'time',
                time: {
                    unit: 'minute',
                    displayFormats: {
                        minute: 'HH:mm'
                    },
                },
                ticks: {
                    autoSkip: false,
                    stepSize: 1,
                },
                min: fakeStart,
                max: fakeEnd,
            },
        }
    };

    const labels = dates.sort();

    const getData = (a) => {
        let res = [];
        for (let i = 0; i < dates.length; i++) {
            const d = dates[i];
            const [start, end] = getDayStartEnd(d);
            const el = records.filter(r => r.activityId === a.id)
                .filter(r => {
                    return filterRecordByTimeRange(r, start, end)
                })
                .map(r => {
                    const s = isSameDay(r.startTime, d) ? r.startTime : start;
                    const e = isSameDay(r.endTime, d) ? r.endTime : end;
                    return { x: d, y: [updateDate(s, FAKE_DATE), updateDate(e, FAKE_DATE)] };
                });
            res = [...res, ...el];
        }
        return res;
    }


    const datasets = activities.map((a) => {
        return {
            label: a.printName,
            data: getData(a),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    });

    const data = {
        labels: labels,
        datasets: datasets,
    };
    return (
        <div className='AppChart' {...props}>
            <Bar options={options} data={data} />
        </div>
    );
};

TimeRangeBarChart.propTypes = {

};