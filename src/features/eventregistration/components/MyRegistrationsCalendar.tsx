import { Views, type View } from 'react-big-calendar';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Button } from '@mui/material';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, format as formatDate } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { useMyEventRegistrations } from '@/features/eventregistration/hooks/useMyEventRegistrations';
import EventCalendar from '@/components/organisms/EventCalendar';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function MyRegistrationsCalendar() {
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
                start = startOfWeek(date, { weekStartsOn: 1 });
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
                start = startOfWeek(date, { weekStartsOn: 1 });
                end = endOfWeek(date, { weekStartsOn: 1 });
        }

        return {
            fromDate: formatDate(start, 'yyyy-MM-dd'),
            toDate: formatDate(end, 'yyyy-MM-dd'),
        };
    }, [date, view]);

    const { data: registrations, isLoading, error, refetch } = useMyEventRegistrations({
        fromDate,
        toDate,
    });

    useEffect(() => {
        refetch();
    }, [view, date, refetch]);

    const events = useMemo(() => {
        if (!registrations) return [];
        return registrations
            .filter((registration) => {
                const event = registration.event;
                return (event.startDate && event.endDate) ||
                    (event.date && event.startTime && event.endTime);
            })
            .map((registration) => {
                const event = registration.event;
                let start: Date;
                let end: Date;

                if (event.startDate && event.endDate) {
                    start = new Date(event.startDate);
                    end = new Date(event.endDate);
                } else {
                    const dateStr = event.date!;
                    const startTimeStr = event.startTime!;
                    const endTimeStr = event.endTime!;

                    start = new Date(`${dateStr}T${startTimeStr}`);
                    end = new Date(`${dateStr}T${endTimeStr}`);
                }

                return {
                    id: event.id,
                    title: event.name,
                    start,
                    end,
                    resource: { event, registration },
                };
            });
    }, [registrations]);

    const handleEventClick = (eventId: number) => {
        navigate(ROUTES.EVENT_DETAIL(eventId));
    };

    if (error) {
        return (
            <Alert
                severity="error"
                sx={{ borderRadius: 2 }}
                action={
                    <Button color="inherit" size="small" onClick={() => refetch()} startIcon={<RefreshIcon />}>
                        {t("common.actions.retry")}
                    </Button>
                }
            >
                {t('common.error')}
            </Alert>
        );
    }

    return (
        <EventCalendar
            events={events}
            isLoading={isLoading}
            onEventClick={handleEventClick}
            height={700}
            view={view}
            onViewChange={setView}
            date={date}
            onDateChange={setDate}
            messages={{
                next: t('myRegistrations.calendar.navigation.next'),
                previous: t('myRegistrations.calendar.navigation.previous'),
                today: t('myRegistrations.calendar.navigation.today'),
                month: t('myRegistrations.calendar.views.month'),
                week: t('myRegistrations.calendar.views.week'),
                day: t('myRegistrations.calendar.views.day'),
                agenda: t('myRegistrations.calendar.views.agenda'),
                date: t('myRegistrations.calendar.labels.date'),
                time: t('myRegistrations.calendar.labels.time'),
                event: t('myRegistrations.calendar.labels.event'),
                noEventsInRange: t('myRegistrations.calendar.labels.noEventsInRange'),
            }}
        />
    );
}
