
import { STATISTIC_TYPE } from "../../api/types/types";
import { SumTimeBarChart } from "./SumTimeBarChart";
import { TimeRangeBarChart } from "./TimeRangeBarChart";
import { SumValBarChart } from "./SumValBarChart ";

export const ChartFactory = ({ type, ...props }) => {
    let form;
    switch (type) {
        case STATISTIC_TYPE.TIME_RANGE_BAR_CHART:
            form = <TimeRangeBarChart {...props} />;
            break;
        case STATISTIC_TYPE.SUM_TIME_BAR_CHART:
            form = <SumTimeBarChart {...props}></SumTimeBarChart>;
            break;
        case STATISTIC_TYPE.SUM_VAL_BAR_CHART:
            form = <SumValBarChart {...props}></SumValBarChart>;
            break;
        default:
            form = <></>;
            break;
    }
    return form;
}