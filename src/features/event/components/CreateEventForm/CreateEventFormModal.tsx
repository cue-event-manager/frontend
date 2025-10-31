import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import CreateEventForm from "./CreateEventForm";
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog";

interface EventFormModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CreateEventFormModal({
    open,
    onClose,
    onSuccess,
}: EventFormModalProps) {
    const { t } = useTranslation();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleSuccess = () => {
        onSuccess?.();
        onClose();
    };

    const handleRequestClose = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
        onClose();
    };

    const handleCancelClose = () => {
        setConfirmOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleRequestClose}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        overflow: "visible",
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        pb: 1,
                    }}
                >
                    <Typography variant="h6" fontWeight={600}>
                        {t("events.createTitle")}
                    </Typography>
                    <IconButton onClick={handleRequestClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ py: 4 }}>
                    <CreateEventForm />
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={confirmOpen}
                title={t("common.confirmExit.title")}
                message={t("common.confirmExit.message",)}
                confirmText={t("common.actions.exit")}
                cancelText={t("common.actions.cancel")}
                severity="warning"
                onConfirm={handleConfirmClose}
                onCancel={handleCancelClose}
            />
        </>
    );
}
