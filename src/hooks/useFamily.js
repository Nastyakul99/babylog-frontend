import { useState } from "react";
import { useEffect } from "react";
import bridge from '@vkontakte/vk-bridge';
import { Person } from "../api/types/types";
import { ScreenSpinner } from "@vkontakte/vkui";
import { getFamily, addToFamily, deleteFromFamily } from "../api/families";

export const useFamily = ({ userId }) => {
    const [family, setFamily] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    async function refresh(fetchFamily) {
        let newFamily = [];
        for (let i = 0; i < fetchFamily.length; i++) {
            const p = fetchFamily[i];
            const fetchUser = await bridge.send('VKWebAppGetUserInfo', {
                user_id: p.vkId
            });
            const newPerson = new Person({ ...p, user: fetchUser });
            newFamily[i] = newPerson;
        }
        setFamily(newFamily);
        setPopout(null);
    }

    async function fetchData() {
        const fetchFamily = userId ? await getFamily(userId) : [];
        refresh(fetchFamily);
    }

    useEffect(() => {
        fetchData();
    }, [userId]);

    const add = async (newMemberId) => {
        const fetchFamily = await addToFamily(userId, newMemberId);
        refresh(fetchFamily);
    }

    const deleteFrom = async (deletedIds) => {
        for (const id of deletedIds) {
            const fetchFamily = await deleteFromFamily(userId, id);
            refresh(fetchFamily);
        }
    }

    return [family, add, deleteFrom, popout];
}