import { useState } from "react";
import { useEffect } from "react";
import { Baby } from "../api/types/types";
import { ScreenSpinner } from "@vkontakte/vkui";
import { getBabyByPersonVkId, createBaby, deleteBaby, getBabyById, updateBaby } from "../api/babies";

export const useBabies = ({ userId }) => {
    const [babies, setBabies] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    async function refresh(fetchBabies) {
        const newBabies = fetchBabies?.map(b => new Baby(b));
        setBabies(newBabies);
        setPopout(null);
    }

    async function fetchData() {
        const fetchBabies = userId ? await getBabyByPersonVkId(userId) : null;//TODO
        refresh(fetchBabies);
    }

    useEffect(() => {
        fetchData();
    }, [userId]);

    const add = async (newBaby) => {
        await createBaby(userId, newBaby);
        return fetchData()
    }

    const deleteBabies = async (deletedIds) => {
        for (const id of deletedIds) {
            const fetchBabies = await deleteBaby(userId, id);
            refresh(fetchBabies);
        }
    }

    const getBaby = async (id) => {
        const b = await getBabyById(userId, id);
        return new Baby(b);
    }

    const update = async (baby) => {
        const b = await updateBaby(userId, baby);
        fetchData();
        return new Baby(b);
    }

    return [babies, add, deleteBabies, getBaby, update, popout];
}