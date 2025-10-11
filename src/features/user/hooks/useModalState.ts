import { useState, useCallback } from "react";

export function useModalState<T = undefined>() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<T | undefined>(undefined);

    const openModal = useCallback((payload?: T) => {
        setData(payload);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setData(undefined);
    }, []);

    return {
        isOpen,
        openModal,
        closeModal,
        data,
        hasData: !!data,
    };
}
