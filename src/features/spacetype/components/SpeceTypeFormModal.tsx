import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import SpaceTypeForm from "./SpaceTypeForm";
import type { SpaceType } from "@/domain/spacetype/SpaceType";

interface SpaceTypeFormModalProps {
    open: boolean;
    initialData?: SpaceType | null;
    onClose: () => void;
    onSuccess?: () => void;
}

export function SpaceTypeFormModal({
    open,
    initialData,
    onClose,
    onSuccess,
}: SpaceTypeFormModalProps) {
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
                            ? "admin.spaceTypes.editTitle"
                            : "admin.spaceTypes.createTitle"
                    )}
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 4 }}>
                <SpaceTypeForm initialData={initialData} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
