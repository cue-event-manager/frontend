import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Stack,
    TextField,
    InputAdornment,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { useMyEvents } from "@/features/event/hooks/useMyEvents";
import { useGenerateEventRegistrationsReport } from "../hooks/useGenerateEventRegistrationsReport";
import { ReportFormat } from "@/domain/report/enums/ReportFormat";
import EventReportCard, { EventReportCardSkeleton } from "./EventReportCard";
import SearchIcon from "@mui/icons-material/Search";
import { BaseEntityList } from "@/components/molecules/List";
import { useEntityTable } from "@/features/user/hooks/useEntityTable";
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";
import type { EventPaginationRequestDto } from "@/domain/event/EventPaginationRequestDto";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";

export default function EventRegistrationsReportSection() {
    const { t } = useTranslation();
    const [selectedFormat, setSelectedFormat] = useState<ReportFormat>(ReportFormat.EXCEL);
    const [generatingEventId, setGeneratingEventId] = useState<number | null>(null);

    const {
        query,
        updateQuery,
        data: eventsData,
        isLoading,
        isFetching,
        refetch,
    } = useEntityTable<EventPaginationRequestDto, EventWithAvailabilityResponseDto>(useMyEvents);

    const searchTerm = useMemo(() => query.name ?? "", [query.name]);

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

    const handleSearchChange = (value: string) => {
        updateQuery({ name: value, page: 0 });
    };

    return (
        <Box>
            <Stack spacing={3} mb={3}>
                <Box display="flex" gap={2} flexWrap="wrap">
                    <TextField
                        placeholder={t("reports.eventRegistrations.searchPlaceholder")}
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        size="small"
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

            <BaseEntityList<EventWithAvailabilityResponseDto>
                data={eventsData}
                loading={isLoading || isFetching}
                onReload={refetch}
                onQueryChange={updateQuery as (query: PaginationQuery) => void}
                skeleton={(idx) => <EventReportCardSkeleton key={idx} />}
                skeletonCount={6}
                filters={null}
                renderItem={(item) => (
                    <EventReportCard
                        event={item}
                        onGenerateReport={handleGenerateReport}
                        isGenerating={generatingEventId === item.event.id}
                    />
                )}
            />

            {!isLoading && !isFetching && (eventsData?.items?.length ?? 0) === 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    {searchTerm
                        ? t("reports.eventRegistrations.noEventsFound")
                        : t("reports.eventRegistrations.noEvents")}
                </Alert>
            )}
        </Box>
    );
}
