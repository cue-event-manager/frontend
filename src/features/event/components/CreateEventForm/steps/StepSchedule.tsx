import { useFormContext, Controller } from "react-hook-form";
import { Box, Grid, TextField, Typography, FormControlLabel, Checkbox, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { EventFormData } from "@/shared/validation/eventSchema";
import { useEffect } from "react";
import { FormSection, FormSectionAlert } from "../components/FormSection";

interface StepScheduleProps {
    lockRecurrentDates?: boolean;
    lockMessage?: string;
}

export default function StepSchedule({ lockRecurrentDates = false, lockMessage }: StepScheduleProps = {}) {
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
    const lockHint = lockMessage ?? t("events.hints.recurrentScheduleLocked", " ");

    useEffect(() => {
        if (lockRecurrentDates) return;
        if (isRecurrent) {
            clearErrors(["date"]);
            resetField("date", { defaultValue: undefined });
        } else {
            clearErrors(["startDate", "endDate", "recurrenceType"]);
            resetField("startDate", { defaultValue: undefined });
            resetField("endDate", { defaultValue: undefined });
            resetField("recurrenceType", { defaultValue: undefined });
        }
    }, [isRecurrent, clearErrors, resetField, lockRecurrentDates]);

    return (
        <Box sx={{ mt: 1 }}>
            <FormSection
                title={t("events.sections.schedule")}
                subtitle={t("events.sections.dates")}
            >
                {lockRecurrentDates && (
                    <FormSectionAlert severity="warning" description={lockHint} sx={{ mb: 2 }} />
                )}

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
                                            disabled={lockRecurrentDates}
                                        />
                                    )}
                                />
                            }
                            label={t("events.fields.isRecurrent")}
                            disabled={lockRecurrentDates}
                        />

                        {errors.isRecurrent && (
                            <Typography color="error" variant="caption">
                                {String(errors.isRecurrent.message)}
                            </Typography>
                        )}

                        {!lockRecurrentDates && isRecurrent && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {t("events.hints.recurrentMode")}
                            </Typography>
                        )}
                    </Grid>
                </Grid>

                {isRecurrent ? (
                    <RecurrentFields
                        t={t}
                        errors={errors}
                        control={control}
                        register={register}
                        lockRecurrentDates={lockRecurrentDates}
                    />
                ) : (
                    <SingleFields t={t} errors={errors} control={control} register={register} />
                )}
            </FormSection>
        </Box>
    );
}

function SingleFields({
    t,
    errors,
    control,
    register,
}: {
    t: any;
    errors: any;
    control: any;
    register: any;
}) {
    return (
        <>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                {t("events.labels.singleEventHint", "Evento con una única fecha")}
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type="date"
                                label={t("events.fields.date")}
                                InputLabelProps={{ shrink: true }}
                                value={formatDateForInput(field.value)}
                                onChange={(e) =>
                                    field.onChange(e.target.value ? new Date(e.target.value) : null)
                                }
                                error={!!errors.date}
                                helperText={String(errors.date?.message ?? " ")}
                            />
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
    );
}

function RecurrentFields({
    t,
    errors,
    control,
    register,
    lockRecurrentDates,
}: {
    t: any;
    errors: any;
    control: any;
    register: any;
    lockRecurrentDates: boolean;
}) {
    return (
        <>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                {t("events.labels.recurrentEventHint", "Evento con recurrencia")}
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type="date"
                                label={t("events.fields.startDate")}
                                InputLabelProps={{ shrink: true }}
                                value={formatDateForInput(field.value)}
                                onChange={(e) =>
                                    field.onChange(e.target.value ? new Date(e.target.value) : null)
                                }
                                error={!!errors.startDate}
                                helperText={String(errors.startDate?.message ?? " ")}
                                disabled={lockRecurrentDates}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type="date"
                                label={t("events.fields.endDate")}
                                InputLabelProps={{ shrink: true }}
                                value={formatDateForInput(field.value)}
                                onChange={(e) =>
                                    field.onChange(e.target.value ? new Date(e.target.value) : null)
                                }
                                error={!!errors.endDate}
                                helperText={String(errors.endDate?.message ?? " ")}
                                disabled={lockRecurrentDates}
                            />
                        )}
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
                                disabled={lockRecurrentDates}
                            >
                                <MenuItem value="DAILY">{t("events.recurrence.daily")}</MenuItem>
                                <MenuItem value="WEEKLY">{t("events.recurrence.weekly")}</MenuItem>
                                <MenuItem value="MONTHLY">{t("events.recurrence.monthly")}</MenuItem>
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
    );
}

function formatDateForInput(value: unknown) {
    if (!value) return "";
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value.toISOString().split("T")[0];
    }
    if (typeof value === "string" && value.length > 0) {
        return value.split("T")[0];
    }
    return "";
}
