import { Grid, Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import type { SummaryDto } from "@/domain/dashboard/GetOrganizerDashboardResponseDto";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import UpcomingIcon from "@mui/icons-material/Upcoming";

interface DashboardSummaryCardsProps {
    summary: SummaryDto;
}

export default function DashboardSummaryCards({ summary }: DashboardSummaryCardsProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    const cards = [
        {
            title: t("organizer.dashboard.summaryCards.totalEvents"),
            value: summary.totalEvents,
            icon: EventIcon,
            color: theme.palette.primary.main,
            bgColor: theme.palette.mode === 'dark'
                ? 'rgba(144, 202, 249, 0.08)'
                : 'rgba(25, 118, 210, 0.08)',
        },
        {
            title: t("organizer.dashboard.summaryCards.upcomingEvents"),
            value: summary.upcomingEvents,
            icon: UpcomingIcon,
            color: theme.palette.info.main,
            bgColor: theme.palette.mode === 'dark'
                ? 'rgba(79, 195, 247, 0.08)'
                : 'rgba(3, 169, 244, 0.08)',
        },
        {
            title: t("organizer.dashboard.summaryCards.totalRegistrations"),
            value: summary.totalRegistrations,
            icon: PeopleIcon,
            color: theme.palette.success.main,
            bgColor: theme.palette.mode === 'dark'
                ? 'rgba(129, 199, 132, 0.08)'
                : 'rgba(46, 125, 50, 0.08)',
        },
        {
            title: t("organizer.dashboard.summaryCards.checkedIn"),
            value: summary.checkedIn,
            icon: CheckCircleIcon,
            color: theme.palette.success.main,
            bgColor: theme.palette.mode === 'dark'
                ? 'rgba(129, 199, 132, 0.08)'
                : 'rgba(46, 125, 50, 0.08)',
        },
        {
            title: t("organizer.dashboard.summaryCards.cancelled"),
            value: summary.cancelled,
            icon: CancelIcon,
            color: theme.palette.error.main,
            bgColor: theme.palette.mode === 'dark'
                ? 'rgba(244, 143, 177, 0.08)'
                : 'rgba(211, 47, 47, 0.08)',
        },
        {
            title: t("organizer.dashboard.summaryCards.noShow"),
            value: summary.noShow,
            icon: PersonOffIcon,
            color: theme.palette.warning.main,
            bgColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 183, 77, 0.08)'
                : 'rgba(237, 108, 2, 0.08)',
        },
        {
            title: t("organizer.dashboard.summaryCards.avgCapacityUsage"),
            value: summary.averageCapacityUsage,
            icon: TrendingUpIcon,
            color: theme.palette.secondary.main,
            bgColor: theme.palette.mode === 'dark'
                ? 'rgba(206, 147, 216, 0.08)'
                : 'rgba(156, 39, 176, 0.08)',
            suffix: "%",
            decimals: 1,
        },
    ];

    return (
        <Grid container spacing={3}>
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={card.title}>
                        <Card
                            sx={{
                                height: "100%",
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: theme.shadows[8],
                                },
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {card.title}
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: card.bgColor,
                                        }}
                                    >
                                        <Icon sx={{ color: card.color, fontSize: 28 }} />
                                    </Box>
                                </Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: card.color,
                                    }}
                                >
                                    <CountUp
                                        end={card.value}
                                        duration={1.5}
                                        decimals={card.decimals || 0}
                                        suffix={card.suffix || ""}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}
