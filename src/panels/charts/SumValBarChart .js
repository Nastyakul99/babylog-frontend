import { sumValInRange } from '../../calcRecords/calcRecords';
import { getDayStartEnd } from '../../utils/dateUtils';
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
    LinearScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const SumValBarChart  = ({
    text = "",
    activities = [],
    records = [],
    dates = [],
    ...props }) => {

    const printTooltipLabel = (context) => {
        return context.raw.y + " мл";
    }

    const printYTick = (value) => {
        return value + " мл";
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
                ticks: {
                    callback: printYTick,
                }
            }
        }
    };

    const labels = [...dates].sort();

    const getData = (a) => {
        let res = [];
        for (let i = 0; i < dates.length; i++) {
            const d = dates[i];
            const [start, end] = getDayStartEnd(d);
            const el = records.filter(r => r.activityId === a.id)
            res = [...res, { x: d, y: sumValInRange(el, start, end) }];
        }
        return res;
    }


    const datasets = activities.map((a) => {
        return {
            label: a.printName,
            data: getData(a),
            backgroundColor: a.color,
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

SumValBarChart.propTypes = {

};