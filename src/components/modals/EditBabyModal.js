import { Div, ModalPageHeader } from "@vkontakte/vkui"
import { useMetaParams } from "@vkontakte/vk-mini-apps-router";
import { useParams } from "@vkontakte/vk-mini-apps-router";
import { useState, useEffect } from "react";
import { Baby } from "../../api/types/types";
import { useBabies } from "../../hooks/useBabies";
import { GENDER } from "../../api/types/types";
import { FormItem, Input, Select, DateInput, Button } from "@vkontakte/vkui";
import { parseToIntOrNull } from "../../utils/parseToIntOrNull";

export const EditBabyModal = ({ person = {}, onClose = () => { } }) => {
    const metaParams = useMetaParams();
    const params = useParams();
    const { paramId } = metaParams || params || {};
    const id = parseToIntOrNull(paramId);
    const [baby, setBaby] = useState();
    const [, add, , get, update,] = useBabies({ userId: person.vkId });

    const getBaby = async () => {
        if (id == null || id == "null") {
            return new Baby({
                name: "MAX",
                id: 0,
                birthDate: "2025-07-10",
                gender: GENDER.MALE
            });
        }
        return await get(id);
    }

    useEffect(() => {
        async function fetchData() {
            setBaby(await getBaby());
        };
        fetchData();
    }, [id]);

    const handleNameChange = (e) => {
        setBaby((prev) => ({ ...prev, name: e.target.value }));
    };

    const handleGenderChange = (e) => {
        const value = e.target.value || e.currentTarget.value;
        setBaby((prev) => ({ ...prev, gender: value }));
    };

    const handleBirthDateChange = (value) => {
        const isoDate = value.toISOString().slice(0, 10);
        setBaby((prev) => ({ ...prev, birthDate: isoDate }));
    };

    const save = async () => {
        try {
            if (id == null) {
                await add(baby);
            } else {
                await update(baby);
            }
        } finally {
            onClose();
        }
    }

    return <>
        <ModalPageHeader>Малыш</ModalPageHeader>
        <Div>
            {baby && <form onSubmit={(e) => { e.preventDefault(); save() }}>
                <FormItem top="Имя" htmlFor="name">
                    <Input id="name" type="text" value={baby.name} onChange={handleNameChange} />
                </FormItem>
                <FormItem top="Пол" htmlFor="gender-select-id">
                    <Select
                        id="gender-select-id"
                        placeholder="Выберите пол"
                        options={[
                            {
                                value: GENDER.UNDEFINED,
                                label: '-',
                            },
                            {
                                value: GENDER.MALE,
                                label: 'Мужской',
                            },
                            {
                                value: GENDER.FEMALE,
                                label: 'Женский',
                            },
                        ]}
                        value={baby.gender}
                        onChange={handleGenderChange}
                    />
                </FormItem>
                <FormItem top="День рождения" htmlFor="date">
                    <DateInput id="date"
                        aria-label="День рождения"
                        value={new Date(baby.birthDate)}
                        onChange={handleBirthDateChange} />
                </FormItem>
                <FormItem>
                    <Button type="submit" size="l" stretched>
                        Сохранить
                    </Button>
                </FormItem>
            </form>}
        </Div>
    </>
}