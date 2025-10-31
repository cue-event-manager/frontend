import { useFormContext, Controller } from "react-hook-form";
import {
    Box,
    Grid,
    TextField,
    Typography,
    Divider,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import type { EventFormData } from "@/shared/validation/eventSchema";
import { useEffect } from "react";

export default function StepSchedule() {
    const { t } = useTranslation();

    const {
        control,
        register,
        watch,
        resetField,
        clearErrors,
        formState: { errors },
    } = useFormContext<EventFormData>();

    const isRecurrent = watch("isRecurrent");


    useEffect(() => {
        if (isRecurrent) {
            clearErrors(["date"]);
            resetField("date", { defaultValue: undefined });
        } else {
            clearErrors(["startDate", "endDate", "recurrenceType"]);
            resetField("startDate", { defaultValue: undefined });
            resetField("endDate", { defaultValue: undefined });
            resetField("recurrenceType", { defaultValue: undefined });
        }
    }, [isRecurrent, clearErrors, resetField]);

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("events.sections.schedule")}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                        control={
                            <Controller
                                name="isRecurrent"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        checked={!!field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        }
                        label={t("events.fields.isRecurrent")}
                    />

                    {errors.isRecurrent && (
                        <Typography color="error" variant="caption">
                            {String(errors.isRecurrent.message)}
                        </Typography>
                    )}

                    {isRecurrent && (
                        <Alert
                            severity="info"
                            sx={{
                                mt: 1,
                                borderRadius: 2,
                                fontSize: "0.9rem",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {t("events.hints.recurrentMode")}
                        </Alert>
                    )}
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("events.sections.dates")}
            </Typography>

            {!isRecurrent ? (
                <>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                    >
                        {t("events.labels.singleEventHint", "Evento con una única fecha")}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label={t("events.fields.date")}
                                InputLabelProps={{ shrink: true }}
                                {...register("date")}
                                error={!!errors.date}
                                helperText={String(errors.date?.message ?? " ")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                type="time"
                                label={t("events.fields.startTime")}
                                InputLabelProps={{ shrink: true }}
                                {...register("startTime")}
                                error={!!errors.startTime}
                                helperText={String(errors.startTime?.message ?? " ")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                type="time"
                                label={t("events.fields.endTime")}
                                InputLabelProps={{ shrink: true }}
                                {...register("endTime")}
                                error={!!errors.endTime}
                                helperText={String(errors.endTime?.message ?? " ")}
                            />
                        </Grid>
                    </Grid>
                </>
            ) : (
                <>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                    >
                        {t("events.labels.recurrentEventHint", "Evento con recurrencia")}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label={t("events.fields.startDate")}
                                InputLabelProps={{ shrink: true }}
                                {...register("startDate")}
                                error={!!errors.startDate}
                                helperText={String(errors.startDate?.message ?? " ")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label={t("events.fields.endDate")}
                                InputLabelProps={{ shrink: true }}
                                {...register("endDate")}
                                error={!!errors.endDate}
                                helperText={String(errors.endDate?.message ?? " ")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller
                                name="recurrenceType"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        select
                                        fullWidth
                                        label={t("events.fields.recurrenceType")}
                                        {...field}
                                        error={!!errors.recurrenceType}
                                        helperText={String(errors.recurrenceType?.message ?? " ")}
                                    >
                                        <MenuItem value="DAILY">
                                            {t("events.recurrence.daily")}
                                        </MenuItem>
                                        <MenuItem value="WEEKLY">
                                            {t("events.recurrence.weekly")}
                                        </MenuItem>
                                        <MenuItem value="MONTHLY">
                                            {t("events.recurrence.monthly")}
                                        </MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                type="time"
                                label={t("events.fields.startTime")}
                                InputLabelProps={{ shrink: true }}
                                {...register("startTime")}
                                error={!!errors.startTime}
                                helperText={String(errors.startTime?.message ?? " ")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                type="time"
                                label={t("events.fields.endTime")}
                                InputLabelProps={{ shrink: true }}
                                {...register("endTime")}
                                error={!!errors.endTime}
                                helperText={String(errors.endTime?.message ?? " ")}
                            />
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
}
