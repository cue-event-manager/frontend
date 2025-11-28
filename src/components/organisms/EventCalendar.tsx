import { Calendar, dateFnsLocalizer, Views, type View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, CircularProgress, useTheme, alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';

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

interface CalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    resource?: any;
}

interface EventCalendarProps {
    events: CalendarEvent[];
    isLoading?: boolean;
    onEventClick?: (eventId: number) => void;
    height?: number;
    view?: View;
    onViewChange?: (view: View) => void;
    date?: Date;
    onDateChange?: (date: Date) => void;
    messages?: {
        next?: string;
        previous?: string;
        today?: string;
        month?: string;
        week?: string;
        day?: string;
        agenda?: string;
        date?: string;
        time?: string;
        event?: string;
        noEventsInRange?: string;
    };
}

export default function EventCalendar({
    events,
    isLoading = false,
    onEventClick,
    height = 500,
    view = Views.WEEK,
    onViewChange,
    date = new Date(),
    onDateChange,
    messages,
}: EventCalendarProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    const handleSelectEvent = (event: CalendarEvent) => {
        if (onEventClick) {
            onEventClick(event.id);
        }
    };

    const defaultMessages = {
        next: t('common.calendar.navigation.next', 'Siguiente'),
        previous: t('common.calendar.navigation.previous', 'Anterior'),
        today: t('common.calendar.navigation.today', 'Hoy'),
        month: t('common.calendar.views.month', 'Mes'),
        week: t('common.calendar.views.week', 'Semana'),
        day: t('common.calendar.views.day', 'Día'),
        agenda: t('common.calendar.views.agenda', 'Agenda'),
        date: t('common.calendar.labels.date', 'Fecha'),
        time: t('common.calendar.labels.time', 'Hora'),
        event: t('common.calendar.labels.event', 'Evento'),
        noEventsInRange: t('common.calendar.labels.noEventsInRange', 'No hay eventos en este período'),
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                height,
                '& .rbc-calendar': {
                    fontFamily: theme.typography.fontFamily,
                },
                '& .rbc-header': {
                    padding: '12px 6px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
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
                    borderRadius: '6px',
                    border: 'none',
                    padding: '4px 8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.1)}`,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                        boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.15)}`,
                        transform: 'translateY(-1px)',
                    },
                },
                '& .rbc-event-content': {
                    whiteSpace: 'normal',
                    overflow: 'visible',
                },
                '& .rbc-day-slot .rbc-event': {
                    border: `1px solid ${alpha(theme.palette.primary.dark, 0.2)}`,
                },
                '& .rbc-month-view .rbc-event': {
                    padding: '2px 6px',
                    fontSize: '0.813rem',
                },
                '& .rbc-selected': {
                    backgroundColor: theme.palette.primary.dark,
                },
                '& .rbc-toolbar': {
                    marginBottom: '16px',
                    '& button': {
                        color: theme.palette.text.primary,
                        borderColor: theme.palette.divider,
                        backgroundColor: theme.palette.background.paper,
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
                },
                '& .rbc-current-time-indicator': {
                    backgroundColor: theme.palette.error.main,
                },
                '& .rbc-agenda-table': {
                    '& .rbc-agenda-date-cell, & .rbc-agenda-time-cell, & .rbc-agenda-event-cell': {
                        color: theme.palette.text.primary,
                        borderColor: theme.palette.divider,
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
                onView={onViewChange}
                date={date}
                onNavigate={onDateChange}
                onSelectEvent={handleSelectEvent}
                culture='es'
                min={new Date(1970, 0, 1, 7, 0, 0)}
                max={new Date(1970, 0, 1, 22, 0, 0)}
                messages={{ ...defaultMessages, ...messages }}
            />
        </Box>
    );
}
