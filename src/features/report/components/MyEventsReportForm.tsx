import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Stack,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useGenerateMyEventsReport } from "../hooks/useGenerateMyEventsReport";
import { myEventsReportSchema } from "@/shared/validation/myEventsReportSchema";
import type { GenerateMyEventsReportRequestDto } from "@/domain/report/GenerateMyEventsReportRequestDto";
import { ReportFormat } from "@/domain/report/enums/ReportFormat";
import { EventStatus } from "@/domain/event/enums/EventStatus";
import { Controller } from "react-hook-form";
import DownloadIcon from "@mui/icons-material/Download";

export default function MyEventsReportForm() {
    const { t } = useTranslation();
    const generateReportMutation = useGenerateMyEventsReport();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useAppForm<GenerateMyEventsReportRequestDto>({
        resolver: yupResolver(myEventsReportSchema) as any,
        defaultValues: {
            startDate: "",
            endDate: "",
            status: undefined,
            format: ReportFormat.EXCEL,
        },
    });

    const onSubmit = (data: GenerateMyEventsReportRequestDto) => {
        generateReportMutation.mutate(data);
    };

    return (
        <Box>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, }}>
                        <Paper variant="outlined" sx={{ p: 2, bgcolor: "background.default" }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="primary">
                                {t("reports.myEvents.sections.dateRange")}
                            </Typography>
                            <Grid container spacing={2} mt={0.5}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label={t("reports.myEvents.fields.startDate")}
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        {...register("startDate")}
                                        error={!!errors.startDate}
                                        helperText={errors.startDate?.message ?? " "}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label={t("reports.myEvents.fields.endDate")}
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        {...register("endDate")}
                                        error={!!errors.endDate}
                                        helperText={errors.endDate?.message ?? " "}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Paper variant="outlined" sx={{ p: 2, bgcolor: "background.default" }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="primary">
                                {t("reports.myEvents.sections.filters")}
                            </Typography>
                            <Grid container spacing={2} mt={0.5}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>{t("reports.myEvents.fields.status")}</InputLabel>
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({ field }) => (
                                                <Select {...field} label={t("reports.myEvents.fields.status")}>
                                                    <MenuItem value="">
                                                        {t("reports.myEvents.allStatuses")}
                                                    </MenuItem>
                                                    <MenuItem value={EventStatus.PUBLISHED}>
                                                        {t("events.status.PUBLISHED")}
                                                    </MenuItem>
                                                    <MenuItem value={EventStatus.IN_PROGRESS}>
                                                        {t("events.status.IN_PROGRESS")}
                                                    </MenuItem>
                                                    <MenuItem value={EventStatus.FINISHED}>
                                                        {t("events.status.FINISHED")}
                                                    </MenuItem>
                                                    <MenuItem value={EventStatus.CANCELLED}>
                                                        {t("events.status.CANCELLED")}
                                                    </MenuItem>
                                                </Select>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>{t("reports.fields.format")}</InputLabel>
                                        <Controller
                                            name="format"
                                            control={control}
                                            render={({ field }) => (
                                                <Select {...field} label={t("reports.fields.format")}>
                                                    <MenuItem value={ReportFormat.EXCEL}>
                                                        {t("reports.formats.EXCEL")}
                                                    </MenuItem>
                                                    <MenuItem value={ReportFormat.PDF}>
                                                        {t("reports.formats.PDF")}
                                                    </MenuItem>
                                                </Select>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Alerts */}
                <Stack spacing={2} mt={3}>
                    {generateReportMutation.isError && (
                        <Alert severity="error" onClose={() => generateReportMutation.reset()}>
                            {t("reports.myEvents.error")}
                        </Alert>
                    )}

                    {generateReportMutation.isSuccess && (
                        <Alert severity="success" onClose={() => generateReportMutation.reset()}>
                            {t("reports.myEvents.success")}
                        </Alert>
                    )}
                </Stack>

                {/* Submit Button */}
                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        loading={generateReportMutation.isPending}
                        startIcon={<DownloadIcon />}
                        sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                    >
                        {t("reports.actions.generate")}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
