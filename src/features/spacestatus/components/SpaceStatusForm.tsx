import { Box, Button, TextField, FormControlLabel, Switch } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useCreateSpaceStatus } from "../hooks/useCreateSpaceStatus";
import { useUpdateSpaceStatus } from "../hooks/useUpdateSpaceStatus";
import type { CreateSpaceStatusRequestDto } from "@/domain/spacestatus/CreateSpaceStatusRequestDto";
import type { UpdateSpaceStatusRequestDto } from "@/domain/spacestatus/UpdateSpaceStatusRequestDto";
import type { SpaceStatus } from "@/domain/spacestatus/SpaceStatus";
import { spaceStatusSchema } from "@/shared/validation/spaceStatusSchema";

interface SpaceStatusFormProps {
    initialData?: SpaceStatus | null;
    onSuccess?: () => void;
}

export default function SpaceStatusForm({ initialData, onSuccess }: SpaceStatusFormProps) {
    const { t } = useTranslation();

    const isEditMode = Boolean(initialData);
    const createMutation = useCreateSpaceStatus();
    const updateMutation = useUpdateSpaceStatus();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useAppForm<CreateSpaceStatusRequestDto | UpdateSpaceStatusRequestDto>({
        resolver: yupResolver(spaceStatusSchema) as any,
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
            canBeReserved: initialData?.canBeReserved ?? false,
        },
    });

    const canBeReserved = watch("canBeReserved");

    const onSubmit = (data: CreateSpaceStatusRequestDto | UpdateSpaceStatusRequestDto) => {
        if (isEditMode && initialData) {
            updateMutation.mutate(
                { ...(data as UpdateSpaceStatusRequestDto), id: initialData.id },
                { onSuccess }
            );
        } else {
            createMutation.mutate(data as CreateSpaceStatusRequestDto, { onSuccess });
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
                label={t("admin.spaceStatuses.fields.name")}
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message ?? " "}
            />

            <TextField
                fullWidth
                label={t("admin.spaceStatuses.fields.description")}
                margin="normal"
                multiline
                rows={3}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message ?? " "}
            />

            <FormControlLabel
                control={
                    <Switch
                        checked={canBeReserved}
                        onChange={(_, value) => setValue("canBeReserved", value)}
                    />
                }
                label={t("admin.spaceStatuses.fields.canBeReserved")}
                sx={{ mt: 2 }}
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
                {isEditMode ? t("common.actions.update") : t("common.actions.create")}
            </Button>
        </Box>
    );
}
