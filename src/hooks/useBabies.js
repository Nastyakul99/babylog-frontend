import { useState } from "react";
import { useEffect } from "react";
import { Baby } from "../api/types/types";
import { ScreenSpinner } from "@vkontakte/vkui";
import { getBabyByPersonVkId, createBaby, deleteBaby } from "../api/babies";

export const useBabies = ({ userId }) => {
    const [babies, setBabies] = useState([]);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    async function refresh(fetchBabies) {
        const newBabies = fetchBabies?.map(b => new Baby(b));
        setBabies(newBabies);
        setPopout(null);
    }

    async function fetchData() {
        const fetchBabies = await getBabyByPersonVkId(userId);
        refresh(fetchBabies);
    }

    useEffect(() => {
        fetchData();
    }, [userId]);

    const add = async (newBaby) => {
        const fetchBabies = await createBaby(userId, newBaby);
        fetchData()
        //refresh(fetchBabies);
    }

    const deleteBabies = async (deletedIds) => {
        for (const id of deletedIds) {
            const fetchBabies = await deleteBaby(userId, id);
            refresh(fetchBabies);
        }
    }

    return [babies, add, deleteBabies, popout];
}