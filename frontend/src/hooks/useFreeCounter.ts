import { useEffect, useState } from "react";

const STORAGE_KEY = "zipflow-free-counter";
const MAX_FREE_COMPRESSIONS = 3;

interface FreeCounterData {
    remaining: number;
}

export default function useFreeCounter() {

    const [remaining, setRemaining] = useState(MAX_FREE_COMPRESSIONS);

    useEffect(() => {

        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {

            const initialData: FreeCounterData = {
                remaining: MAX_FREE_COMPRESSIONS
            };

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(initialData)
            );

            return;
        }

        try {

            const data: FreeCounterData = JSON.parse(stored);

            setRemaining(data.remaining);

        } catch {

            localStorage.removeItem(STORAGE_KEY);

        }

    }, []);

    const save = (value: number) => {

        setRemaining(value);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                remaining: value
            })
        );

    };

    const decrement = () => {

        if (remaining <= 0) return;

        save(remaining - 1);

    };

    const reset = () => {

        save(MAX_FREE_COMPRESSIONS);

    };

    return {

        remaining,

        decrement,

        reset,

        hasRemaining: remaining > 0

    };

}