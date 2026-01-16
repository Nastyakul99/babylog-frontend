import { ModalPageHeader, Group } from "@vkontakte/vkui"
import { useMetaParams } from "@vkontakte/vk-mini-apps-router";
import { useParams } from "@vkontakte/vk-mini-apps-router";
import { useState, useEffect } from "react";
import { FormItem, DateInput, Button } from "@vkontakte/vkui";
import { parseToIntOrNull } from "../../../utils/parseToIntOrNull";
import { Image } from "@vkontakte/vkui";
import { FormEditRecordFactory } from "./FormEditRecordFactory";
import { useContext } from "react";
import { ErrorContext } from "../../../App";
import { Info } from "../../../panels/wrapp/InfoAlert/Info";
import { ALERT_TYPES } from "../../../panels/wrapp/InfoAlert/AlertTypes";
import { filterRecordByTimeRange } from "../../../calcRecords/calcRecords";

export const EditRecordModal = ({ onClose = () => { },
    get = async () => { },
    update = async () => { },
    getActivityById = () => { },
    refreshRecord = () => { },
    records = [] }) => {
    const metaParams = useMetaParams();
    const params = useParams();
    const paramId = metaParams || params || {};
    const id = parseToIntOrNull(paramId.recordId);
    const [record, setRecord] = useState();
    const { addError } = useContext(ErrorContext);

    const activity = record ? getActivityById(record.activityId) : null;

    const getRecord = async () => {
        if (id == null || id == "null") {
            return null;
        }
        return await get(id);
    }

    useEffect(() => {
        async function fetchData() {
            setRecord(await getRecord(id));
        };
        fetchData();
    }, [id]);

    const handleStartTimeChange = (value) => {
        const date = value.toISOString();
        setRecord((prev) => ({ ...prev, startTime: date }));
    };

    const isValid = () => {
        const startDate = new Date(record.startTime);
        const endDate = new Date(record.endTime);
        return startDate < endDate;
    }

    const isValidIntervals = () => {
        return records.filter(r => r.activityId === record.activityId && r.id != record.id)
            .filter(r => filterRecordByTimeRange(r, record.startTime, record.endTime, true)).length === 0;
    }

    const save = async () => {
        if (!isValid()) {
            addError(new Info(2, "начало позднее конца", ALERT_TYPES.ERROR));
            return;
        }
        if (!isValidIntervals()) {
            addError(new Info(3, "пересечение интервалов", ALERT_TYPES.ERROR));
            return;
        }
        try {
            await update(record);
            refreshRecord();
        } finally {
            onClose();
        }
    }

    return record && <>
        <ModalPageHeader before={<Image src={activity.img}></Image>}>{activity.name}</ModalPageHeader>
        <Group className="AppModal">
            <form onSubmit={(e) => { e.preventDefault(); save() }}>
                <FormItem top="Начало" htmlFor="date">
                    <DateInput
                        id="startTime"
                        aria-label="Начало"
                        enableTime={true}
                        value={new Date(record.startTime)}
                        onChange={handleStartTimeChange}
                    />
                </FormItem>
                <FormEditRecordFactory
                    type={activity.type}
                    record={record}
                    setRecord={setRecord}>
                </FormEditRecordFactory>
                <FormItem>
                    <Button className="AppButton" type="submit" size="l" stretched>
                        Сохранить
                    </Button>
                </FormItem>
            </form>
        </Group>
    </>
}