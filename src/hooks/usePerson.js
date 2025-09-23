import { useState } from "react";
import { useEffect } from "react";
import bridge from '@vkontakte/vk-bridge';
import { Person } from "../api/types/types";
import { ScreenSpinner } from "@vkontakte/vkui";
import { createPerson } from "../api/persons";

export const usePerson = () => {
    const [person, setPerson] = useState({});
    const [popout, setPopout] = useState(<ScreenSpinner />);

    useEffect(() => {
        async function fetchData() {
            const fetchUser = (process.env.REACT_APP_AUTH === "true") ? await bridge.send('VKWebAppGetUserInfo')
                : { id: 382798664 };
            const fetchPerson = await createPerson(fetchUser.id);
            const newPerson = new Person({ ...fetchPerson, user: fetchUser });
            setPerson(newPerson);
            setPopout(null);
        }
        fetchData();
    }, []);

    return [person, setPerson, popout];
}