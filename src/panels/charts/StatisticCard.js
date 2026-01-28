import { ContentCard, Text } from "@vkontakte/vkui"
import { STATISTIC_TYPE } from "../../api/types/types"
import { getDayStartEnd } from "../../utils/dateUtils"
import { sumTimeInRange, sumValInRange } from "../../calcRecords/calcRecords"
import { countRecordsInTimeRange } from "../../calcRecords/calcRecords"
import { getAverage } from "../../utils/getAverage"

const StatisticFactory = ({ type, dates, records, text }) => {
    const calcValue = (calc) => {
        let res = [];
        for (let i = 0; i < dates.length; i++) {
            const d = dates[i];
            const [start, end] = getDayStartEnd(d);
            res.push(calc(records, start, end));
        }
        const ave = getAverage(res)
        return ave;
    }

    let value;
    let uom;
    switch (type) {
        case STATISTIC_TYPE.NUMBER_OF_TIMES_PER_DAY:
            value = calcValue(countRecordsInTimeRange);
            uom = "раз";
            break;
        case STATISTIC_TYPE.SUM_TIME_PER_DAY:
            value = calcValue(sumTimeInRange)
            uom = "мин";
            break;
        case STATISTIC_TYPE.SUM_VAL_PER_DAY:
            value = calcValue(sumValInRange)
            uom = "мл";
            break;
        case STATISTIC_TYPE.SUM_ONCE_PER_DAY:
            value = calcValue(sumValInRange)
            uom = "раз";
            break;
        default:
            value = null;
            break;
    }
    return value != null ? <Text>{text} : {value} {uom}</Text> : <></>;
}



export const StatisticCard = ({ data = {}, dates = [], records = [] }) => {
    if (dates.length === 0) return null;
    let print = [];
    Object.keys(data).forEach(charts_key => {
        Object.keys(data[charts_key]).forEach(key => {
            if (data[charts_key][key].length > 0) {
                print.push(
                    <StatisticFactory
                        key={`${charts_key}-${key}`}
                        type={charts_key}
                        records={records.filter((r) => data[charts_key][key]
                            .some(u => u.id === r.activityId))}
                        text={key}
                        dates={dates}>
                    </StatisticFactory>
                )
            }
        });
    });

    return <ContentCard
        title="Средние значения"
        className="StatisticCard"
        description={print}>
    </ContentCard >
}