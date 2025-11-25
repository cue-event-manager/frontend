import {
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    CircularProgress,
    Pagination,
    Stack,
    TextField,
    InputAdornment,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useMyEvents } from "@/features/event/hooks/useMyEvents";
import { useGenerateEventRegistrationsReport } from "../hooks/useGenerateEventRegistrationsReport";
import { ReportFormat } from "@/domain/report/enums/ReportFormat";
import EventReportCard from "./EventReportCard";
import SearchIcon from "@mui/icons-material/Search";

export default function EventRegistrationsReportSection() {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFormat, setSelectedFormat] = useState<ReportFormat>(ReportFormat.EXCEL);
    const [generatingEventId, setGeneratingEventId] = useState<number | null>(null);

    const { data: eventsData, isLoading: eventsLoading } = useMyEvents({
        page,
        size: 12,
        name: searchTerm || undefined,
    });

    const generateReportMutation = useGenerateEventRegistrationsReport();

    const handleGenerateReport = (eventId: number) => {
        setGeneratingEventId(eventId);
        generateReportMutation.mutate(
            { eventId, format: selectedFormat },
            {
                onSettled: () => {
                    setGeneratingEventId(null);
                },
            }
        );
    };

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage - 1);
    };

    const events = eventsData?.content ?? [];
    const totalPages = eventsData?.totalPages ?? 0;

    return (
        <Box>
            {/* Header with format selector */}
            <Stack spacing={3} mb={3}>
                <Box display="flex" gap={2} flexWrap="wrap">
                    <TextField
                        placeholder={t("reports.eventRegistrations.searchPlaceholder")}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(0);
                        }}
                        size="small"
                        sx={{ flexGrow: 1, minWidth: 200 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl size="small" sx={{ minWidth: 200 }}>
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
                </Box>

                {generateReportMutation.isError && (
                    <Alert severity="error" onClose={() => generateReportMutation.reset()}>
                        {t("reports.eventRegistrations.error")}
                    </Alert>
                )}

                {generateReportMutation.isSuccess && (
                    <Alert severity="success" onClose={() => generateReportMutation.reset()}>
                        {t("reports.eventRegistrations.success")}
                    </Alert>
                )}
            </Stack>

            {/* Events Grid */}
            {eventsLoading ? (
                <Box display="flex" justifyContent="center" py={8}>
                    <CircularProgress />
                </Box>
            ) : events.length === 0 ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                    {searchTerm
                        ? t("reports.eventRegistrations.noEventsFound")
                        : t("reports.eventRegistrations.noEvents")}
                </Alert>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {events.map((event) => (
                            <Grid item xs={12} sm={6} md={4} key={event.event.id}>
                                <EventReportCard
                                    event={event}
                                    onGenerateReport={handleGenerateReport}
                                    isGenerating={generatingEventId === event.event.id}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Pagination
                                count={totalPages}
                                page={page + 1}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                            />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}
