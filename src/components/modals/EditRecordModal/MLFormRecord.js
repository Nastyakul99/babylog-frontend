import { FormItem } from "@vkontakte/vkui";
import { CFormInput } from "@coreui/react";

export const MLFormRecord = ({ record, setRecord }) => {
    return <FormItem top="мл" htmlFor="val">
        <CFormInput
            type="number"
            min={0}
            max={1000}
            step={10}
            value={record.val}
            onChange={(event) => setRecord((prev) => ({ ...prev, val: parseInt(event.target.value, 10) }))}
        />
    </FormItem>
}