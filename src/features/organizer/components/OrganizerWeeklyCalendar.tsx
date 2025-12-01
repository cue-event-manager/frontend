import { Calendar, dateFnsLocalizer, Views, type View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMyEvents } from '@/features/event/hooks/useMyEvents';
import { useEffect, useMemo, useState } from 'react';
import { Box, Paper, Typography, CircularProgress, useTheme, alpha } from '@mui/material';
import { startOfWeek as startOfWeekDate, endOfWeek, format as formatDate } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';

const locales = {
    'es': es,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function OrganizerWeeklyCalendar() {
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [view, setView] = useState<View>(Views.WEEK);
    const [date, setDate] = useState(new Date());

    const { fromDate, toDate } = useMemo(() => {
        let start: Date;
        let end: Date;

        switch (view) {
            case Views.MONTH:
                start = startOfMonth(date);
                end = endOfMonth(date);
                break;
            case Views.WEEK:
                start = startOfWeekDate(date, { weekStartsOn: 1 });
                end = endOfWeek(date, { weekStartsOn: 1 });
                break;
            case Views.DAY:
                start = date;
                end = date;
                break;
            case Views.AGENDA:
                start = date;
                end = addDays(date, 30);
                break;
            default:
                start = startOfWeekDate(date, { weekStartsOn: 1 });
                end = endOfWeek(date, { weekStartsOn: 1 });
        }

        return {
            fromDate: formatDate(start, 'yyyy-MM-dd'),
            toDate: formatDate(end, 'yyyy-MM-dd'),
        };
    }, [date, view]);

    const { data, isLoading, error, refetch } = useMyEvents({
        page: 0,
        size: 100,
        fromDate,
        toDate,
    });

    useEffect(() => {
        refetch();
    }, [view, date, refetch]);

    const events = useMemo(() => {
        if (!data?.items) return [];
        return data.items
            .filter((item) => {
                return (item.event.startDate && item.event.endDate) ||
                    (item.event.date && item.event.startTime && item.event.endTime);
            })
            .map((item) => {
                let start: Date;
                let end: Date;

                if (item.event.startDate && item.event.endDate) {
                    start = new Date(item.event.startDate);
                    end = new Date(item.event.endDate);
                } else {
                    const dateStr = item.event.date!;
                    const startTimeStr = item.event.startTime!;
                    const endTimeStr = item.event.endTime!;

                    start = new Date(`${dateStr}T${startTimeStr}`);
                    end = new Date(`${dateStr}T${endTimeStr}`);
                }

                return {
                    id: item.event.id,
                    title: item.event.name,
                    start,
                    end,
                    resource: item.event,
                };
            });
    }, [data]);

    const handleSelectEvent = (event: any) => {
        navigate(ROUTES.EVENT_DETAIL(event.id));
    };

    if (error) {
        return (
            <Paper sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
                {t('organizer.calendar.error')}
            </Paper>
        );
    }

    return (
        <Paper
            sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                maxWidth: '100%',
                width: '100%',
                mx: 'auto',
                height: { xs: 'auto', sm: 600 },
                minHeight: { xs: 500, sm: 600 },
                backgroundColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.9)
                    : theme.palette.background.paper,
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1),
                borderRadius: 3,
                overflow: 'hidden',
                minWidth: 0,
            }}
        >
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    mb: { xs: 2, md: 3 },
                    fontWeight: 600,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
            >
                {t('organizer.calendar.title')}
            </Typography>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 300 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        minWidth: 0,
                        height: { xs: 450, sm: 500 },
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        overscrollBehaviorX: 'contain',
                        '& .rbc-calendar': {
                            fontFamily: theme.typography.fontFamily,
                            maxWidth: '100%',
                            width: '100%',
                            minWidth: 0,
                        },
                        '& .rbc-time-view': {
                            minWidth: 0,
                        },
                        '& .rbc-time-header': {
                            minWidth: 0,
                        },
                        '& .rbc-header': {
                            padding: { xs: '8px 4px', sm: '12px 6px' },
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.mode === 'dark'
                                ? alpha(theme.palette.primary.main, 0.1)
                                : alpha(theme.palette.primary.main, 0.05),
                            borderColor: theme.palette.divider,
                        },
                        '& .rbc-today': {
                            backgroundColor: theme.palette.mode === 'dark'
                                ? alpha(theme.palette.primary.main, 0.15)
                                : alpha(theme.palette.primary.main, 0.08),
                        },
                        '& .rbc-off-range-bg': {
                            backgroundColor: theme.palette.mode === 'dark'
                                ? alpha(theme.palette.background.default, 0.5)
                                : alpha(theme.palette.action.hover, 0.3),
                        },
                        '& .rbc-event': {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            borderRadius: '4px',
                            border: 'none',
                            padding: { xs: '1px 4px', sm: '2px 6px' },
                            fontSize: { xs: '0.7rem', sm: '0.813rem' },
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        },
                        '& .rbc-selected': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                        '& .rbc-toolbar': {
                            marginBottom: { xs: '12px', sm: '16px' },
                            flexWrap: { xs: 'wrap', sm: 'nowrap' },
                            gap: { xs: 1, sm: 0 },
                            '& .rbc-btn-group': {
                                display: 'flex',
                                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                                justifyContent: { xs: 'center', sm: 'flex-start' },
                                width: { xs: '100%', sm: 'auto' },
                                gap: { xs: 0.5, sm: 0 },
                            },
                            '& .rbc-toolbar-label': {
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                flex: { xs: '1 1 100%', sm: '1 1 auto' },
                                textAlign: { xs: 'center', sm: 'center' },
                                order: { xs: -1, sm: 0 },
                                marginBottom: { xs: 1, sm: 0 },
                                minWidth: 0,
                            },
                            '& button': {
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.divider,
                                backgroundColor: theme.palette.background.paper,
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                padding: { xs: '4px 8px', sm: '6px 12px' },
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                                '&.rbc-active': {
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    borderColor: theme.palette.primary.main,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark,
                                    },
                                },
                            },
                        },
                        '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
                            borderColor: theme.palette.divider,
                            backgroundColor: theme.palette.background.paper,
                        },
                        '& .rbc-day-bg, & .rbc-time-slot': {
                            borderColor: theme.palette.divider,
                        },
                        '& .rbc-time-content': {
                            borderColor: theme.palette.divider,
                            minWidth: 0,
                            overflowX: 'auto',
                            '& > .rbc-time-gutter': {
                                flex: '0 0 auto',
                                width: { xs: 48, sm: 64 },
                            },
                            '& > .rbc-day-slot': {
                                flex: '1 1 0',
                                minWidth: 0,
                            },
                        },
                        '& .rbc-current-time-indicator': {
                            backgroundColor: theme.palette.error.main,
                        },
                        '& .rbc-agenda-table': {
                            '& .rbc-agenda-date-cell, & .rbc-agenda-time-cell, & .rbc-agenda-event-cell': {
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.divider,
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                padding: { xs: '8px 4px', sm: '10px 8px' },
                            },
                        },
                        '& .rbc-time-header-content': {
                            borderColor: theme.palette.divider,
                            minWidth: 0,
                        },
                        '& .rbc-time-column': {
                            '& .rbc-timeslot-group': {
                                minHeight: { xs: 40, sm: 60 },
                            },
                        },
                    }}
                >
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                        view={view}
                        onView={setView}
                        date={date}
                        onNavigate={setDate}
                        onSelectEvent={handleSelectEvent}
                        culture='es'
                        min={new Date(1970, 0, 1, 7, 0, 0)}
                        max={new Date(1970, 0, 1, 22, 0, 0)}
                        messages={{
                            next: t('organizer.calendar.navigation.next'),
                            previous: t('organizer.calendar.navigation.previous'),
                            today: t('organizer.calendar.navigation.today'),
                            month: t('organizer.calendar.views.month'),
                            week: t('organizer.calendar.views.week'),
                            day: t('organizer.calendar.views.day'),
                            agenda: t('organizer.calendar.views.agenda'),
                            date: t('organizer.calendar.labels.date'),
                            time: t('organizer.calendar.labels.time'),
                            event: t('organizer.calendar.labels.event'),
                            noEventsInRange: t('organizer.calendar.labels.noEventsInRange'),
                        }}
                    />
                </Box>
            )}
        </Paper>
    );
}
