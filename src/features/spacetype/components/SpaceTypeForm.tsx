import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useCreateSpaceType } from "../hooks/useCreateSpaceType";
import { useUpdateSpaceType } from "../hooks/useUpdateSpaceType";
import type { SpaceType } from "@/domain/spacetype/SpaceType";
import type { CreateSpaceTypeRequestDto } from "@/domain/spacetype/CreateSpaceTypeRequestDto";
import type { UpdateSpaceTypeRequestDto } from "@/domain/spacetype/UpdateSpaceTypeRequestDto";
import { spaceTypeSchema } from "@/shared/validation/spaceTypeSchema";

interface SpaceTypeFormProps {
    initialData?: SpaceType | null;
    onSuccess?: () => void;
}

export default function SpaceTypeForm({ initialData, onSuccess }: SpaceTypeFormProps) {
    const { t } = useTranslation();

    const isEditMode = Boolean(initialData);
    const createMutation = useCreateSpaceType();
    const updateMutation = useUpdateSpaceType();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<CreateSpaceTypeRequestDto | UpdateSpaceTypeRequestDto>({
        resolver: yupResolver(spaceTypeSchema) as any,
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
        },
    });

    const onSubmit = (data: CreateSpaceTypeRequestDto | UpdateSpaceTypeRequestDto) => {
        if (isEditMode && initialData) {
            updateMutation.mutate(
                { ...data, id: initialData.id },
                { onSuccess }
            );
        } else {
            createMutation.mutate(data as CreateSpaceTypeRequestDto, { onSuccess });
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
                label={t("admin.spaceTypes.fields.name")}
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message ?? " "}
            />

            <TextField
                fullWidth
                label={t("admin.spaceTypes.fields.description")}
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
