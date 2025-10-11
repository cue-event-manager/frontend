import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
    severity?: "warning" | "error" | "info";
}

export function ConfirmDialog({
    open,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    isLoading = false,
    severity = "warning",
}: ConfirmDialogProps) {
    const { t } = useTranslation();

    const getColor = () => {
        switch (severity) {
            case "error":
                return "error";
            case "info":
                return "primary";
            default:
                return "warning";
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>
                {title || t("common.confirm.title")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={onCancel}
                    disabled={isLoading}
                    color="inherit"
                >
                    {cancelText || t("common.actions.cancel")}
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color={getColor()}
                    disabled={isLoading}
                    autoFocus
                >
                    {confirmText || t("common.actions.confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
