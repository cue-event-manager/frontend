import {
    Box,
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Alert,
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
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ width: "100%" }}
        >
            <TextField
                fullWidth
                label={t("reports.myEvents.fields.startDate")}
                type="date"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                {...register("startDate")}
                error={!!errors.startDate}
                helperText={errors.startDate?.message ?? " "}
            />

            <TextField
                fullWidth
                label={t("reports.myEvents.fields.endDate")}
                type="date"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                {...register("endDate")}
                error={!!errors.endDate}
                helperText={errors.endDate?.message ?? " "}
            />

            <FormControl fullWidth margin="normal">
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
                                {t("event.status.PUBLISHED")}
                            </MenuItem>
                            <MenuItem value={EventStatus.IN_PROGRESS}>
                                {t("event.status.IN_PROGRESS")}
                            </MenuItem>
                            <MenuItem value={EventStatus.FINISHED}>
                                {t("event.status.FINISHED")}
                            </MenuItem>
                            <MenuItem value={EventStatus.CANCELLED}>
                                {t("event.status.CANCELLED")}
                            </MenuItem>
                        </Select>
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
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

            {generateReportMutation.isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {t("reports.myEvents.error")}
                </Alert>
            )}

            {generateReportMutation.isSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {t("reports.myEvents.success")}
                </Alert>
            )}

            <Button
                type="submit"
                variant="contained"
                loading={generateReportMutation.isPending}
                fullWidth
                sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
                {t("reports.actions.generate")}
            </Button>
        </Box>
    );
}
