import { useState } from "react"

export const useSelected = () => {
    const [selected, setSelected] = useState(new Set([]));

    const update = (el) => {
        let newSet = new Set(selected);
        if (newSet.has(el)) {
            newSet.delete(el);
            setSelected(newSet)
            return;
        }
        newSet.add(el);
        setSelected(newSet);
    }

    return [selected, update]
}