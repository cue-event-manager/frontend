import { useState, useCallback } from "react";

export interface UseConfirmDialogReturn<T> {
    isOpen: boolean;
    data: T | null;
    openDialog: (data: T) => void;
    closeDialog: () => void;
    confirm: (callback: (data: T) => void | Promise<void>) => void;
}


export function useConfirmDialog<T = number>(): UseConfirmDialogReturn<T> {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<T | null>(null);

    const openDialog = useCallback((value: T) => {
        setData(value);
        setIsOpen(true);
    }, []);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
        setData(null);
    }, []);

    const confirm = useCallback(
        async (callback: (data: T) => void | Promise<void>) => {
            if (!data) return;
            await callback(data);
            closeDialog();
        },
        [data, closeDialog]
    );

    return {
        isOpen,
        data,
        openDialog,
        closeDialog,
        confirm,
    };
}
