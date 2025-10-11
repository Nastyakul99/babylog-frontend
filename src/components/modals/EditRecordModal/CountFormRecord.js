import { FormItem } from "@vkontakte/vkui";
import { CFormInput } from "@coreui/react";

export const CountFormRecord = ({ record, setRecord }) => {
    return <FormItem top="Кол-во пробуждений" htmlFor="val">
        <CFormInput
            type="number"
            min={0}
            max={100}
            step={1}
            value={record.val}
            onChange={(event) => setRecord((prev) => ({ ...prev, val: parseInt(event.target.value, 10) }))}
        />
    </FormItem>
}