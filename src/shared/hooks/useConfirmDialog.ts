import { useState, useCallback } from "react";

interface ConfirmDialogState {
    isOpen: boolean;
    itemId: number | null;
}

interface UseConfirmDialogReturn {
    isOpen: boolean;
    itemId: number | null;
    openDialog: (id: number) => void;
    closeDialog: () => void;
    handleConfirm: (onConfirm: (id: number) => void) => void;
}

export function useConfirmDialog(): UseConfirmDialogReturn {
    const [state, setState] = useState<ConfirmDialogState>({
        isOpen: false,
        itemId: null,
    });

    const openDialog = useCallback((id: number) => {
        setState({ isOpen: true, itemId: id });
    }, []);

    const closeDialog = useCallback(() => {
        setState({ isOpen: false, itemId: null });
    }, []);

    const handleConfirm = useCallback(
        (onConfirm: (id: number) => void) => {
            if (state.itemId !== null) {
                onConfirm(state.itemId);
                closeDialog();
            }
        },
        [state.itemId, closeDialog]
    );

    return {
        isOpen: state.isOpen,
        itemId: state.itemId,
        openDialog,
        closeDialog,
        handleConfirm,
    };
}