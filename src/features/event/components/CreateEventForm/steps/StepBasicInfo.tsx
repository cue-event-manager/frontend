import { useFormContext, Controller } from "react-hook-form";
import {
    Box,
    Grid,
    TextField,
    Typography,
    Divider,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { SearchSelect } from "@/components/molecules/SearchSelect";
import { FileUpload } from "@/features/file/components/FileUpload";
import type { File as UploadedFile } from "@/domain/file/File";
import { useAllEventCategories } from "@/features/eventcategory/hooks/useAllEventCategories";
import { useAllEventModalities } from "@/features/eventmodality/hooks/useAllEventModalities";
import type { EventFormData } from "@/shared/validation/eventSchema";

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

    const handleUploadSuccess = (file: UploadedFile) => {
        setValue("imagePath", file.path, { shouldValidate: true });
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("events.sections.banner")}
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Controller
                        name="imagePath"
                        control={control}
                        render={() => (
                            <Box sx={{ width: '100%' }}>
                                <FileUpload
                                    label={t("events.fields.bannerUpload")}
                                    onUploadSuccess={handleUploadSuccess}
                                    accept="image/*"
                                />
                                {errors.imagePath && (
                                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                                        {String(errors.imagePath.message)}
                                    </Typography>
                                )}
                            </Box>
                        )}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("events.sections.basicInfo")}
            </Typography>

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

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("events.sections.type")}
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
                        <Typography variant="body2" color="text.secondary">
                            {t("events.hints.recurrentMode")}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}
