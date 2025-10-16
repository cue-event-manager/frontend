import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import type { Space } from "@/domain/space/Space";
import { useAllCampuses } from "@/features/campus/hooks/useAllCampuses";
import { useAllSpaceTypes } from "@/features/spacetype/hooks/useAllSpaceTypes";
import { useAllSpaceStatuses } from "@/features/spacestatus/hooks/useAllSpaceStatuses";
import { useAllSpaceResources } from "@/features/spaceresource/hooks/useAllSpaceResources";
import type { CreateSpaceRequestDto } from "@/domain/space/CreateSpaceRequestDto";
import type { UpdateSpaceRequestDto } from "@/domain/space/UpdateSpaceRequestDto";
import { SearchSelect } from "@/components/molecules/SearchSelect";
import { useCreateSpace } from "../hooks/useCreateSpace";
import { useUpdateSpace } from "../hooks/useUpdateSpace";
import { spaceSchema } from "@/shared/validation/spaceSchema";

interface SpaceFormProps {
    initialData?: Space | null;
    onSuccess?: () => void;
}

export default function SpaceForm({ initialData, onSuccess }: SpaceFormProps) {
    const { t } = useTranslation();

    const isEditMode = Boolean(initialData);
    const createMutation = useCreateSpace();
    const updateMutation = useUpdateSpace();

    const campuses = useAllCampuses();
    const types = useAllSpaceTypes();
    const statuses = useAllSpaceStatuses();
    const resources = useAllSpaceResources();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<CreateSpaceRequestDto | UpdateSpaceRequestDto>({
        resolver: yupResolver(spaceSchema) as any,
        defaultValues: {
            name: initialData?.name ?? "",
            campusId: initialData?.campus?.id ?? undefined,
            typeId: initialData?.type?.id ?? undefined,
            statusId: initialData?.status?.id ?? undefined,
            capacity: initialData?.capacity ?? undefined,
            resourceIds: initialData?.resources?.map((r) => r.id) ?? [],
        },
    });

    const onSubmit = (data: CreateSpaceRequestDto | UpdateSpaceRequestDto) => {
        if (isEditMode && initialData) {
            updateMutation.mutate(
                { ...(data as UpdateSpaceRequestDto), id: initialData.id },
                { onSuccess }
            );
        } else {
            createMutation.mutate(data as CreateSpaceRequestDto, { onSuccess });
        }
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("admin.spaces.sections.basicInfo")}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label={t("admin.spaces.fields.name")}
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message ?? " "}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <SearchSelect
                        name="campusId"
                        label={t("admin.spaces.fields.campus")}
                        control={control}
                        options={
                            campuses.data?.map((c) => ({ label: c.name, value: c.id })) ?? []
                        }
                        loading={campuses.isLoading}
                        required
                        margin="none"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        type="number"
                        label={t("admin.spaces.fields.capacity")}
                        {...register("capacity")}
                        error={!!errors.capacity}
                        helperText={errors.capacity?.message ?? " "}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("admin.spaces.sections.classification")}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SearchSelect
                        name="typeId"
                        label={t("admin.spaces.fields.type")}
                        control={control}
                        options={
                            types.data?.map((t) => ({ label: t.name, value: t.id })) ?? []
                        }
                        loading={types.isLoading}
                        required
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <SearchSelect
                        name="statusId"
                        label={t("admin.spaces.fields.status")}
                        control={control}
                        options={
                            statuses.data?.map((s) => ({ label: s.name, value: s.id })) ?? []
                        }
                        loading={statuses.isLoading}
                        required
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("admin.spaces.sections.resources")}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <SearchSelect
                        name="resourceIds"
                        label={t("admin.spaces.fields.resources")}
                        control={control}
                        options={
                            resources.data?.map((r) => ({ label: r.name, value: r.id })) ?? []
                        }
                        multiple
                        loading={resources.isLoading}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                >
                    {isEditMode
                        ? t("common.actions.update")
                        : t("common.actions.create")}
                </Button>
            </Box>
        </Box>
    );
}