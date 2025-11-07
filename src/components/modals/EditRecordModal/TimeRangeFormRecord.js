import { FormItem } from "@vkontakte/vkui";
import { DateInput } from "@vkontakte/vkui";

export const TimeRangeFormRecord = ({ record, setRecord }) => {
    const handleEndTimeChange = (value) => {
        const date = value && value.toISOString();
        setRecord((prev) => ({ ...prev, endTime: date }));
    };

    return <FormItem top="Конец" htmlFor="date">
        <DateInput
            id="endTime"
            aria-label="Конец"
            enableTime={true}
            value={record.endTime && new Date(record.endTime)}
            onChange={handleEndTimeChange}
        />
    </FormItem>
}