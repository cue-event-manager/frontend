import { Box, Button, TextField, FormControlLabel, Switch } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useCreateEventModality } from "../hooks/useCreateEventModality";
import { useUpdateEventModality } from "../hooks/useUpdateEventModality";
import type { EventModality } from "@/domain/eventmodality/EventModality";
import type { CreateEventModalityRequestDto } from "@/domain/eventmodality/CreateEventModalityRequestDto";
import type { UpdateEventModalityRequestDto } from "@/domain/eventmodality/UpdateEventModalityRequestDto";
import { eventModalitySchema } from "@/shared/validation/eventModalitySchema";
import { Controller } from "react-hook-form";

interface EventModalityFormProps {
    initialData?: EventModality | null;
    onSuccess?: () => void;
}

export default function EventModalityForm({ initialData, onSuccess }: EventModalityFormProps) {
    const { t } = useTranslation();

    const isEditMode = Boolean(initialData);
    const createMutation = useCreateEventModality();
    const updateMutation = useUpdateEventModality();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useAppForm<CreateEventModalityRequestDto | UpdateEventModalityRequestDto>({
        resolver: yupResolver(eventModalitySchema) as any,
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
            requiresSpace: initialData?.requiresSpace ?? false,
        },
    });

    const onSubmit = (data: CreateEventModalityRequestDto | UpdateEventModalityRequestDto) => {
        if (isEditMode && initialData) {
            updateMutation.mutate(
                { ...data, id: initialData.id },
                { onSuccess }
            );
        } else {
            createMutation.mutate(data as CreateEventModalityRequestDto, { onSuccess });
        }
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ width: "100%" }}
        >
            <TextField
                fullWidth
                label={t("admin.eventModalities.fields.name")}
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message ?? " "}
            />

            <TextField
                fullWidth
                label={t("admin.eventModalities.fields.description")}
                margin="normal"
                multiline
                rows={3}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message ?? " "}
            />

            <Controller
                name="requiresSpace"
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                        control={
                            <Switch
                                checked={field.value}
                                onChange={field.onChange}
                            />
                        }
                        label={t("admin.eventModalities.fields.requiresSpace")}
                        sx={{ mt: 2 }}
                    />
                )}
            />

            <Button
                type="submit"
                variant="contained"
                loading={isLoading}
                fullWidth
                sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
                {isEditMode
                    ? t("common.actions.update")
                    : t("common.actions.create")}
            </Button>
        </Box>
    );
}
