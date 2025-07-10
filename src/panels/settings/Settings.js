import { Panel, Group } from "@vkontakte/vkui"
import { FamilySettings } from "./FamilySettings"
import { AccordionVK } from "../../components/AccordionVK";
import { Header } from "@vkontakte/vkui";
import { Wrapp } from "../wrapp/Wrapp";

export const Settings = ({ id, person }) => {
    if (person == null) return <></>;
    const data = [
        {
            id: 1,
            title: 'Семья',
            detail: <FamilySettings person={person}></FamilySettings>,
        },
        {
            id: 2,
            title: 'Малыши',
            detail: <div></div>,
        },
        {
            id: 3,
            title: 'Приложение',
            detail: <div></div>,
        },
    ];
    return <Wrapp id={id}>
        <Group header={<Header size="s">настройки</Header>}>
            <AccordionVK data={data}></AccordionVK>
        </Group>
    </Wrapp>
}