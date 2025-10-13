import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import SpaceStatusForm from "./SpaceStatusForm";
import type { SpaceStatus } from "@/domain/spacestatus/SpaceStatus";

interface SpaceStatusFormModalProps {
    open: boolean;
    initialData?: SpaceStatus | null;
    onClose: () => void;
    onSuccess?: () => void;
}

export function SpaceStatusFormModal({
    open,
    initialData,
    onClose,
    onSuccess,
}: SpaceStatusFormModalProps) {
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
                            ? "admin.spaceStatuses.editTitle"
                            : "admin.spaceStatuses.createTitle"
                    )}
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 4 }}>
                <SpaceStatusForm initialData={initialData} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
