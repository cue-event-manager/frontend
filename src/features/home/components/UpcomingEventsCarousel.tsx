import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Container,
    IconButton,
    Stack,
    Typography,
    useTheme,
    alpha,
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { EventCard, EventCardSkeleton } from "@/features/event/components/EventCard";
import { useEvents } from "@/features/event/hooks/useEvents";
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";
import { HomeSectionHeader } from "./HomeSectionHeader";

const SCROLL_STEP_FACTOR = 0.8;

function filterUpcomingEvents(items: EventWithAvailabilityResponseDto[] = []) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [...items]
        .filter(({ event }) => {
            const date = event?.date ? new Date(event.date) : null;
            return date && date.getTime() >= today.getTime();
        })
        .sort((a, b) => new Date(a.event.date).getTime() - new Date(b.event.date).getTime())
        .slice(0, 10);
}

export function UpcomingEventsCarousel() {
    const { t } = useTranslation();
    const theme = useTheme();
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const { data, isLoading, isFetching, error, refetch } = useEvents({
        page: 0,
        size: 10!
    });

    const events = useMemo(
        () => filterUpcomingEvents(data?.items as EventWithAvailabilityResponseDto[] | undefined),
        [data?.items]
    );

    const scrollBy = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;
        const step = container.clientWidth * SCROLL_STEP_FACTOR;
        container.scrollBy({
            left: direction === "right" ? step : -step,
            behavior: "smooth",
        });
    };

    const showNavigation = events.length > 1;
    const showSkeletons = isLoading || isFetching;
    const hasError = Boolean(error);

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 6, md: 8 },
                background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
            }}
        >
            <Container maxWidth="xl">
                <Stack spacing={{ xs: 3, md: 4 }}>
                    <HomeSectionHeader
                        title={t("home.upcoming.title", "Próximos eventos")}
                        subtitle={t(
                            "home.upcoming.subtitle",
                            "Descubre las actividades que están por comenzar y asegura tu lugar."
                        )}
                        align="center"
                        maxWidth={720}
                        sx={{ mb: 2 }}
                    />

                    {hasError ? (
                        <Box textAlign="center">
                            <Typography color="error" fontWeight={600} gutterBottom>
                                {t("common.error", "Ocurrió un error")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {error?.message || t("common.errorGeneric", "Inténtalo nuevamente.")}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="primary"
                                sx={{ cursor: "pointer", fontWeight: 600 }}
                                onClick={() => refetch()}
                            >
                                {t("common.actions.retry", "Reintentar")}
                            </Typography>
                        </Box>
                    ) : (
                        <Box position="relative">
                            <Box
                                ref={scrollRef}
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    overflowX: "auto",
                                    scrollSnapType: "x mandatory",
                                    px: 1,
                                    py: { xs: 1, md: 2 },
                                    "::-webkit-scrollbar": { display: "none" },
                                    scrollbarWidth: "none",
                                }}
                            >
                                {showSkeletons
                                    ? Array.from({ length: 4 }).map((_, idx) => (
                                          <Box
                                              key={idx}
                                              sx={{
                                                  flex: "0 0 280px",
                                                  maxWidth: 300,
                                                  width:"100%",
                                                  scrollSnapAlign: "start",
                                              }}
                                          >
                                              <EventCardSkeleton size="small" />
                                          </Box>
                                      ))
                                    : events.length > 0
                                    ? events.map((item) => (
                                          <Box
                                              key={item.event.id}
                                              sx={{
                                                  flex: "0 0 280px",
                                                  maxWidth: 300,
                                                  scrollSnapAlign: "start",
                                              }}
                                          >
                                              <EventCard data={item} size="small" />
                                          </Box>
                                      ))
                                    : (
                                          <Box
                                              sx={{
                                                  width: "100%",
                                                  textAlign: "center",
                                                  py: 6,
                                              }}
                                          >
                                              <Typography variant="body1" color="text.secondary">
                                                  {t("home.upcoming.empty", "No hay eventos próximos disponibles.")}
                                              </Typography>
                                          </Box>
                                      )}
                            </Box>

                            {showNavigation && !showSkeletons && (
                                <>
                                    <IconButton
                                        size="large"
                                        onClick={() => scrollBy("left")}
                                        sx={{
                                            position: "absolute",
                                            top: "45%",
                                            left: { xs: 8, md: -20 },
                                            transform: "translateY(-50%)",
                                            bgcolor: alpha(theme.palette.background.paper, 0.9),
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                                            boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.16)}`,
                                            color: "primary.main",
                                            width: 48,
                                            height: 48,
                                            "&:hover": {
                                                bgcolor: alpha(theme.palette.primary.main, 0.12),
                                                transform: "translateY(-50%) translateX(-1px)",
                                            },
                                        }}
                                    >
                                        <ArrowBackIosNew fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        onClick={() => scrollBy("right")}
                                        sx={{
                                            position: "absolute",
                                            top: "45%",
                                            right: { xs: 8, md: -20 },
                                            transform: "translateY(-50%)",
                                            bgcolor: alpha(theme.palette.background.paper, 0.9),
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                                            boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.16)}`,
                                            color: "primary.main",
                                            width: 48,
                                            height: 48,
                                            "&:hover": {
                                                bgcolor: alpha(theme.palette.primary.main, 0.12),
                                                transform: "translateY(-50%) translateX(1px)",
                                            },
                                        }}
                                    >
                                        <ArrowForwardIos fontSize="small" />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
