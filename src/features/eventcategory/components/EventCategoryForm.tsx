import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useCreateEventCategory } from "../hooks/useCreateEventCategory";
import { useUpdateEventCategory } from "../hooks/useUpdateEventCategory";
import { eventCategorySchema } from "@/shared/validation/eventCategorySchema";
import type { EventCategory } from "@/domain/eventcategory/EventCategory";
import type { CreateEventCategoryRequestDto } from "@/domain/eventcategory/CreateEventCategoryRequestDto";
import type { UpdateEventCategoryRequestDto } from "@/domain/eventcategory/UpdateEventCategoryRequestDto";

interface EventCategoryFormProps {
    initialData?: EventCategory | null;
    onSuccess?: () => void;
}

export default function EventCategoryForm({ initialData, onSuccess }: EventCategoryFormProps) {
    const { t } = useTranslation();

    const isEditMode = Boolean(initialData);
    const createMutation = useCreateEventCategory();
    const updateMutation = useUpdateEventCategory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<CreateEventCategoryRequestDto | UpdateEventCategoryRequestDto>({
        resolver: yupResolver(eventCategorySchema) as any,
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
        },
    });

    const onSubmit = (data: CreateEventCategoryRequestDto | UpdateEventCategoryRequestDto) => {
        if (isEditMode && initialData) {
            updateMutation.mutate(
                { ...data, id: initialData.id },
                { onSuccess }
            );
        } else {
            createMutation.mutate(data as CreateEventCategoryRequestDto, { onSuccess });
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
                label={t("admin.eventCategories.fields.name")}
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message ?? " "}
            />

            <TextField
                fullWidth
                label={t("admin.eventCategories.fields.description")}
                margin="normal"
                multiline
                rows={3}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message ?? " "}
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
