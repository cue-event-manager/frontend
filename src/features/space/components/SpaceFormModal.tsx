import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { Space } from "@/domain/space/Space";
import SpaceForm from "./SpaceForm";

interface SpaceFormModalProps {
    open: boolean;
    initialData?: Space | null;
    onClose: () => void;
    onSuccess?: () => void;
}

export function SpaceFormModal({
    open,
    initialData,
    onClose,
    onSuccess,
}: SpaceFormModalProps) {
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
                            ? "admin.spaces.editTitle"
                            : "admin.spaces.createTitle"
                    )}
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 4 }}>
                <SpaceForm initialData={initialData} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
