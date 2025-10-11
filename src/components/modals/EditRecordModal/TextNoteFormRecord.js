import { FormItem } from "@vkontakte/vkui";
import { Input } from "@vkontakte/vkui";

export const TextNoteFormRecord = ({ record, setRecord }) => {
    const handle = (e) => {
        setRecord((prev) => ({ ...prev, comment: e.target.value }));
    };

    return <FormItem top="Комментарий" htmlFor="comment">
        <Input id="comment" type="text" value={record.comment} onChange={handle} />
    </FormItem>
}