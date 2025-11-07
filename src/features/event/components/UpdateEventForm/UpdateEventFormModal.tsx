import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import UpdateEventForm from "./UpdateEventForm";
import type { Event } from "@/domain/event/Event";

interface UpdateEventFormModalProps {
    open: boolean;
    event: Event | null;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function UpdateEventFormModal({
    open,
    event,
    onClose,
    onSuccess,
}: UpdateEventFormModalProps) {
    const { t } = useTranslation();

    const handleSuccess = () => {
        onSuccess?.();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    maxHeight: "90vh",
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: 1,
                }}
            >
                {t("admin.events.editTitle")}
                <IconButton onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
                {event && <UpdateEventForm event={event} onSuccess={handleSuccess} />}
            </DialogContent>
        </Dialog>
    );
}
