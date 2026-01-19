import { useState, useEffect, useCallback } from "react";
import { Baby } from "../api/types/types";
import { ScreenSpinner } from "@vkontakte/vkui";
import { getBabyByPersonVkId, createBaby, deleteBaby, getBabyById, updateBaby } from "../api/babies";

export const useBabies = ({ userId }) => {
    const [babies, setBabies] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner />);

    const refresh = useCallback((fetchBabies) => {
        const newBabies = fetchBabies?.map(b => new Baby(b)) || null;
        setBabies(newBabies);
        setPopout(null);
    }, []);

    const fetchData = useCallback(async () => {
        if (!userId) {
            setBabies(null);
            setPopout(null);
            return;
        }

        try {
            const fetchBabies = await getBabyByPersonVkId(userId);
            refresh(fetchBabies);
        } catch (error) {
            console.error('Не удалось загрузить малышей:', error);
            setPopout(null);
            setBabies(null);
        }
    }, [userId, refresh]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const add = useCallback(async (newBaby) => {
        await createBaby(userId, newBaby);
        return fetchData();
    }, [userId, fetchData]);

    const deleteBabies = useCallback(async (deletedIds) => {
        try {
            await Promise.all(deletedIds.map(id => deleteBaby(userId, id)));
            await fetchData();
        } catch (error) {
            console.error('Не удалось удалить малышей:', error);
            throw error;
        }
    }, [userId, fetchData]);

    const getBaby = useCallback(async (id) => {
        try {
            const b = await getBabyById(userId, id);
            return new Baby(b);
        } catch (error) {
            console.error('Не удалось получить малыша:', error);
            throw error;
        }
    }, [userId]);

    const update = useCallback(async (baby) => {
        try {
            const b = await updateBaby(userId, baby);
            await fetchData();
            return new Baby(b);
        } catch (error) {
            console.error('Не удалось обновить малыша:', error);
            throw error;
        }
    }, [userId, fetchData]);

    return [babies, add, deleteBabies, getBaby, update, popout];
};