import {
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useRegisteredUsers } from "@/features/eventregistration/hooks/useRegisteredUsers";
import type { EventRegistrationStatus } from "@/domain/eventregistration/enums/EventRegistrationStatus";

interface RegisteredUsersModalProps {
    eventId: number;
    eventName: string;
    open: boolean;
    onClose: () => void;
}

const STATUS_COLOR_MAP: Record<EventRegistrationStatus, "default" | "success" | "error" | "warning" | "primary"> = {
    REGISTERED: "success",
    CHECKED_IN: "primary",
    CANCELLED: "default",
    NO_SHOW: "warning",
};

export function RegisteredUsersModal({ eventId, eventName, open, onClose }: RegisteredUsersModalProps) {
    const { t } = useTranslation();
    const { data, isLoading, isError, refetch } = useRegisteredUsers(eventId, open);

    const renderContent = () => {
        if (isLoading) {
            return (
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            );
        }

        if (isError) {
            return (
                <Stack spacing={2} alignItems="center" py={3}>
                    <Typography color="error">{t("events.card.registeredUsersError")}</Typography>
                    <Button onClick={() => refetch()} variant="outlined">
                        {t("common.actions.retry")}
                    </Button>
                </Stack>
            );
        }

        if (!data || data.length === 0) {
            return (
                <Box py={3} textAlign="center">
                    <Typography color="text.secondary">{t("events.card.registeredUsersEmpty")}</Typography>
                </Box>
            );
        }

        return (
            <Stack spacing={1.5}>
                {data.map((registration) => {
                    const { user, status, registrationDate } = registration;
                    const fullName = `${user.firstName} ${user.lastName}`.trim();
                    const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || user.email?.[0] || "?";
                    const statusLabel = t(`myRegistrations.status.${status}`, status);
                    const formattedDate = registrationDate
                        ? format(new Date(registrationDate), "dd/MM/yyyy HH:mm", { locale: es })
                        : "-";

                    return (
                        <Box
                            key={registration.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 2,
                                p: 1.5,
                                gap: 1.5,
                            }}
                        >
                            <Stack direction="row" spacing={1.5} alignItems="center" flex={1}>
                                <Avatar>{initials}</Avatar>
                                <Box>
                                    <Typography fontWeight={600}>{fullName}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.email}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                <Chip
                                    size="small"
                                    color={STATUS_COLOR_MAP[status]}
                                    label={statusLabel}
                                    variant={status === "CANCELLED" ? "outlined" : "filled"}
                                />
                                <Typography variant="caption" color="text.secondary">
                                    {t("myRegistrations.registeredOn")}: {formattedDate}
                                </Typography>
                            </Stack>
                        </Box>
                    );
                })}
            </Stack>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pr: 1 }}>
                <Typography variant="h6">
                    {t("events.card.registeredUsersTitle", { event: eventName })}
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>{renderContent()}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t("common.actions.close")}</Button>
            </DialogActions>
        </Dialog>
    );
}
