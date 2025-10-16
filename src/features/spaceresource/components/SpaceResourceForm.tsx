import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useCreateSpaceResource } from "../hooks/useCreateSpaceResource";
import { useUpdateSpaceResource } from "../hooks/useUpdateSpaceResource";
import type { SpaceResource } from "@/domain/spaceresource/SpaceResource";
import type { CreateSpaceResourceRequestDto } from "@/domain/spaceresource/CreateSpaceResourceRequestDto";
import type { UpdateSpaceResourceRequestDto } from "@/domain/spaceresource/UpdateSpaceResourceRequestDto";
import { spaceResourceSchema } from "@/shared/validation/spaceResourceSchema";

interface SpaceResourceFormProps {
    initialData?: SpaceResource | null;
    onSuccess?: () => void;
}

export default function SpaceResourceForm({ initialData, onSuccess }: SpaceResourceFormProps) {
    const { t } = useTranslation();

    const isEditMode = Boolean(initialData);
    const createMutation = useCreateSpaceResource();
    const updateMutation = useUpdateSpaceResource();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<CreateSpaceResourceRequestDto | UpdateSpaceResourceRequestDto>({
        resolver: yupResolver(spaceResourceSchema) as any,
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
        },
    });

    const onSubmit = (data: CreateSpaceResourceRequestDto | UpdateSpaceResourceRequestDto) => {
        if (isEditMode && initialData) {
            updateMutation.mutate(
                { ...data, id: initialData.id },
                { onSuccess }
            );
        } else {
            createMutation.mutate(data as CreateSpaceResourceRequestDto, { onSuccess });
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
                label={t("admin.spaceResources.fields.name")}
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message ?? " "}
            />

            <TextField
                fullWidth
                label={t("admin.spaceResources.fields.description")}
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
