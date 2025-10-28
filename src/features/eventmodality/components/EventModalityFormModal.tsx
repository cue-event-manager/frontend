import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import EventModalityForm from "./EventModalityForm";
import type { EventModality } from "@/domain/eventmodality/EventModality";

interface EventModalityFormModalProps {
    open: boolean;
    initialData?: EventModality | null;
    onClose: () => void;
    onSuccess?: () => void;
}

export function EventModalityFormModal({
    open,
    initialData,
    onClose,
    onSuccess,
}: EventModalityFormModalProps) {
    const { t } = useTranslation();
    const isEditing = !!initialData;

    const handleSuccess = () => {
        onSuccess?.();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
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
                    {t(
                        isEditing
                            ? "admin.eventModalities.editTitle"
                            : "admin.eventModalities.createTitle"
                    )}
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 4 }}>
                <EventModalityForm initialData={initialData} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
