import { useFormContext, Controller } from "react-hook-form";
import { Box, Grid, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SearchSelect } from "@/components/molecules/SearchSelect";
import { FileUpload } from "@/features/file/components/FileUpload";
import type { File as UploadedFile } from "@/domain/file/File";
import { useAllEventCategories } from "@/features/eventcategory/hooks/useAllEventCategories";
import { useAllEventModalities } from "@/features/eventmodality/hooks/useAllEventModalities";
import type { EventFormData } from "@/shared/validation/eventSchema";
import { getEventImageUrl } from "@/features/event/constants/media.constant";
import { FormSection } from "../components/FormSection";

export default function StepBasicInfo() {
    const { t } = useTranslation();

    const {
        control,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<EventFormData>();

    const categories = useAllEventCategories();
    const modalities = useAllEventModalities();

    const isRecurrent = watch("isRecurrent");

    const handleModalityChange = (value?: number) => {
        setValue("modalityId", value as any, { shouldValidate: true });
        const modality = modalities.data?.find((m) => m.id === value);
        const requiresSpace = Boolean(modality?.requiresSpace);
        setValue("requiresSpace", requiresSpace);
        if (!requiresSpace) setValue("spaceId", undefined);
    };

    return (
        <Box sx={{ mt: 1 }}>
            <FormSection
                title={t("events.sections.banner")}
                subtitle={t(
                    "events.labels.bannerSubtitle",
                    "Presenta tu evento con un banner atractivo"
                )}
            >
                <Grid container spacing={2} justifyContent="center">
                    <Grid size={{ xs: 12, md: 10, lg: 8 }}>
                        <Controller
                            name="imagePath"
                            control={control}
                            render={({ field }) => (
                                <FileUpload
                                    label={t("events.fields.bannerUpload")}
                                    accept="image/*"
                                    initialPreviewUrl={
                                        field.value ? getEventImageUrl(field.value) : undefined
                                    }
                                    onUploadSuccess={(file: UploadedFile) =>
                                        field.onChange(file.path)
                                    }
                                    onRemove={() => field.onChange(undefined)}
                                />
                            )}
                        />
                        {errors.imagePath && (
                            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                                {String(errors.imagePath.message)}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection title={t("events.sections.basicInfo")}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label={t("events.fields.name")}
                            {...register("name")}
                            error={!!errors.name}
                            helperText={String(errors.name?.message ?? " ")}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            label={t("events.fields.description")}
                            {...register("description")}
                            error={!!errors.description}
                            helperText={String(errors.description?.message ?? " ")}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <SearchSelect
                                    name="categoryId"
                                    label={t("events.fields.category")}
                                    control={control}
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={
                                        categories.data?.map((c) => ({
                                            label: c.name,
                                            value: c.id,
                                        })) ?? []
                                    }
                                    loading={categories.isLoading}
                                    required
                                    margin="none"
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="modalityId"
                            control={control}
                            render={({ field }) => (
                                <SearchSelect
                                    name="modalityId"
                                    label={t("events.fields.modality")}
                                    control={control}
                                    value={field.value}
                                    onChange={(val) => handleModalityChange(val as number)}
                                    options={
                                        modalities.data?.map((m) => ({
                                            label: m.name,
                                            value: m.id,
                                        })) ?? []
                                    }
                                    loading={modalities.isLoading}
                                    required
                                    margin="none"
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label={t("events.fields.cost")}
                            {...register("cost")}
                            error={!!errors.cost}
                            helperText={String(errors.cost?.message ?? " ")}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label={t("events.fields.capacity")}
                            {...register("capacity")}
                            error={!!errors.capacity}
                            helperText={String(errors.capacity?.message ?? " ")}
                        />
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection
                title={t("events.sections.type")}
                subtitle={t(
                    "events.labels.recurrentEventHint",
                    "Selecciona si tu evento tiene una única sesión o varias"
                )}
            >
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
                    <Typography variant="body2" color="text.secondary">
                        {t("events.hints.recurrentMode")}
                    </Typography>
                )}
            </FormSection>
        </Box>
    );
}
