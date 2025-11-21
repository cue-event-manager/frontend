import { useMemo } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppBreadcrumbs } from "@/components/molecules/AppBreadcrumbs";
import { useEventById } from "@/features/event/hooks/useEventById";
import { getEventImageUrl } from "@/features/event/constants/media.constant";
import { useAuth } from "@/contexts/authContext";
import { RoleConstant } from "@/domain/role/RoleConstant";
import { EventDetailHero } from "@/features/event/components/EventDetail/EventDetailHero";
import { EventDetailDescription } from "@/features/event/components/EventDetail/EventDetailDescription";
import { EventDetailQuickInfo } from "@/features/event/components/EventDetail/EventDetailQuickInfo";
import { EventDetailAgenda } from "@/features/event/components/EventDetail/EventDetailAgenda";
import { EventDetailAttachments } from "@/features/event/components/EventDetail/EventDetailAttachments";
import { EventDetailContacts } from "@/features/event/components/EventDetail/EventDetailContacts";
import { EventDetailOrganizerCard } from "@/features/event/components/EventDetail/EventDetailOrganizerCard";
import { EventDetailVirtualInfo } from "@/features/event/components/EventDetail/EventDetailVirtualInfo";
import { EventDetailParticipationCard } from "@/features/event/components/EventDetail/EventDetailParticipationCard";
import { ROUTES } from "@/routes/routes";

export default function EventDetailPage() {
    const { eventId } = useParams<{ eventId?: string }>();
    const numericId = eventId ? Number(eventId) : undefined;
    const safeId = numericId && !Number.isNaN(numericId) ? numericId : undefined;

    const { data, isLoading, isError, refetch } = useEventById(safeId);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const dateFormatter = useMemo(
        () => new Intl.DateTimeFormat(i18n.language, { dateStyle: "long" }),
        [i18n.language]
    );
    const timeFormatter = useMemo(
        () =>
            new Intl.DateTimeFormat(i18n.language, {
                hour: "2-digit",
                minute: "2-digit",
            }),
        [i18n.language]
    );

    if (!safeId) {
        return (
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Alert severity="error" sx={{ borderRadius: 3 }}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                        <Typography>{t("events.detail.invalidEvent")}</Typography>
                        <Button onClick={() => navigate(ROUTES.EVENTS)} variant="contained">
                            {t("events.detail.goBack")}
                        </Button>
                    </Stack>
                </Alert>
            </Container>
        );
    }

    if (isLoading) {
        return (
            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
                <EventDetailSkeleton />
            </Container>
        );
    }

    if (isError || !data) {
        return (
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Alert
                    severity="error"
                    action={
                        <Button onClick={() => refetch()} color="inherit" variant="outlined">
                            {t("common.actions.retry")}
                        </Button>
                    }
                    sx={{ borderRadius: 3 }}
                >
                    {t("events.detail.loadError")}
                </Alert>
            </Container>
        );
    }

    const { event, availability } = data;
    const imageUrl = getEventImageUrl(event.imagePath);
    const userRole = (user?.role?.name as RoleConstant) ?? undefined;
    const isOwner = user?.id === event.createdBy;
    const canManage = isOwner || userRole === RoleConstant.ORGANIZER || userRole === RoleConstant.ADMIN;
    const isAttendee = userRole === RoleConstant.ATTENDEE;

    const handleManage = () => {
        if (canManage) navigate(ROUTES.ORGANIZER.EVENTS);
    };
    const handleLoginRedirect = () => {
        navigate(ROUTES.AUTH.LOGIN, { state: { from: location } });
    };

    return (
        <Box component="section" sx={{ backgroundColor: "background.default" }}>
            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
                <Stack spacing={{ xs: 3.5, md: 4.5 }}>
                    <AppBreadcrumbs currentLabel={event.name} sx={{ "& .MuiBreadcrumbs-separator": { mx: 1 } }} />

                    <EventDetailHero event={event} imageUrl={imageUrl} availability={availability} />

                    <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
                        <Grid size={{ xs: 12, lg: 8 }} >
                            <Stack spacing={{ xs: 3, md: 4 }}>
                                <EventDetailDescription event={event} />
                                <EventDetailQuickInfo
                                    event={event}
                                    dateFormatter={dateFormatter}
                                    timeFormatter={timeFormatter}
                                />
                                <EventDetailAgenda agenda={event.agenda} />
                                <EventDetailAttachments attachments={event.attachments} />
                                <EventDetailContacts contacts={event.extraContacts} />
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Stack spacing={{ xs: 3, md: 4 }}>
                                <EventDetailParticipationCard
                                    availability={availability}
                                    isAttendee={isAttendee}
                                    canManage={canManage}
                                    isOwner={isOwner}
                                    onManage={handleManage}
                                    onLogin={handleLoginRedirect}
                                />
                                <EventDetailOrganizerCard event={event} />
                                <EventDetailVirtualInfo event={event} />
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Box>
    );
}

function EventDetailSkeleton() {
    return (
        <Stack spacing={3}>
            <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 4 }} />
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Stack spacing={3}>
                        {[...Array(4)].map((_, idx) => (
                            <Skeleton key={idx} variant="rectangular" height={160} sx={{ borderRadius: 3 }} />
                        ))}
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Stack spacing={3}>
                        {[...Array(3)].map((_, idx) => (
                            <Skeleton key={idx} variant="rectangular" height={140} sx={{ borderRadius: 3 }} />
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}
