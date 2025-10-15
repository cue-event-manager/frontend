import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import CampusForm from "./CampusForm";
import type { Campus } from "@/domain/campus/Campus";

interface CampusFormModalProps {
    open: boolean;
    initialData?: Campus | null;
    onClose: () => void;
    onSuccess?: () => void;
}

export function CampusFormModal({
    open,
    initialData,
    onClose,
    onSuccess,
}: CampusFormModalProps) {
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
                            ? "admin.campuses.editTitle"
                            : "admin.campuses.createTitle"
                    )}
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 4 }}>
                <CampusForm initialData={initialData} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
