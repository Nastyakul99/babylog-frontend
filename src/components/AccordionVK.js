import { Accordion } from "@vkontakte/vkui";
import { useState } from "react";

export const AccordionVK = ({ data }) => {
    const [openId, setOpenId] = useState();

    return data.map(({ id, title, detail }) => (
        <Accordion
            key={id}
            expanded={openId === id}
            onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}>
            <Accordion.Summary>{title}</Accordion.Summary>
            <Accordion.Content>
                {detail}
            </Accordion.Content>
        </Accordion>
    ));
};