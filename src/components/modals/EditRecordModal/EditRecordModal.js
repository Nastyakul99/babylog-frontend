import { Avatar, ModalPageHeader, Group } from "@vkontakte/vkui"
import { useMetaParams } from "@vkontakte/vk-mini-apps-router";
import { useParams } from "@vkontakte/vk-mini-apps-router";
import { useState, useEffect } from "react";
import { Baby } from "../../../api/types/types";
import { GENDER } from "../../../api/types/types";
import { FormItem, Input, Select, DateInput, Button } from "@vkontakte/vkui";
import { parseToIntOrNull } from "../../../utils/parseToIntOrNull";
import { getBabyPhoto } from "../../CellBabyAvatar";
import { Image } from "@vkontakte/vkui";
import { FormEditRecordFactory } from "./FormEditRecordFactory";

export const EditRecordModal = ({ onClose = () => { },
    get = async () => { },
    update = async () => { },
    getActivityById = () => { },
    refreshRecord = () => { } }) => {
    const metaParams = useMetaParams();
    const params = useParams();
    const paramId = metaParams || params || {};
    const id = parseToIntOrNull(paramId.recordId);
    const [record, setRecord] = useState();

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

    const save = async () => {
        try {
            await update(record);
            refreshRecord();
        } finally {
            onClose();
        }
    }

    return record && <>
        <ModalPageHeader before={<Image src={activity.img}></Image>}>{activity.name}</ModalPageHeader>
        <Group>
            <form onSubmit={(e) => { e.preventDefault(); save() }}>
                <FormItem top="Начало" htmlFor="date">
                    <DateInput id="date"
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
                    <Button type="submit" size="l" stretched>
                        Сохранить
                    </Button>
                </FormItem>
            </form>
        </Group>
    </>
}