import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGenerateEventRegistrationsReport } from "../hooks/useGenerateEventRegistrationsReport";
import { ReportFormat } from "@/domain/report/enums/ReportFormat";
import { useMyEvents } from "@/features/event/hooks/useMyEvents";
import { useState } from "react";

export default function EventRegistrationsReportForm() {
    const { t } = useTranslation();
    const [selectedEventId, setSelectedEventId] = useState<number | "">("");
    const [selectedFormat, setSelectedFormat] = useState<ReportFormat>(ReportFormat.EXCEL);

    const generateReportMutation = useGenerateEventRegistrationsReport();
    const { data: eventsData, isLoading: eventsLoading } = useMyEvents({
        page: 0,
        size: 1000,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedEventId) {
            generateReportMutation.mutate({
                eventId: selectedEventId as number,
                format: selectedFormat,
            });
        }
    };

    if (eventsLoading) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
            </Box>
        );
    }

    const events = eventsData?.items.map((e) => e.event) ?? [];

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
            <FormControl fullWidth margin="normal">
                <InputLabel>{t("reports.eventRegistrations.fields.event")}</InputLabel>
                <Select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value as number)}
                    label={t("reports.eventRegistrations.fields.event")}
                    required
                >
                    <MenuItem value="">
                        {t("reports.eventRegistrations.selectEvent")}
                    </MenuItem>
                    {events.map((event) => (
                        <MenuItem key={event.id} value={event.id}>
                            {event.name} - {new Date(event.date).toLocaleDateString()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>{t("reports.fields.format")}</InputLabel>
                <Select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value as ReportFormat)}
                    label={t("reports.fields.format")}
                >
                    <MenuItem value={ReportFormat.EXCEL}>
                        {t("reports.formats.EXCEL")}
                    </MenuItem>
                    <MenuItem value={ReportFormat.PDF}>
                        {t("reports.formats.PDF")}
                    </MenuItem>
                </Select>
            </FormControl>

            {events.length === 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    {t("reports.eventRegistrations.noEvents")}
                </Alert>
            )}

            {generateReportMutation.isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {t("reports.eventRegistrations.error")}
                </Alert>
            )}

            {generateReportMutation.isSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {t("reports.eventRegistrations.success")}
                </Alert>
            )}

            <Button
                type="submit"
                variant="contained"
                loading={generateReportMutation.isPending}
                disabled={!selectedEventId || events.length === 0}
                fullWidth
                sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
                {t("reports.actions.generate")}
            </Button>
        </Box>
    );
}
