import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useCreateCampus } from "../hooks/useCreateCampus";
import { useUpdateCampus } from "../hooks/useUpdateCampus";
import type { UpdateCampusRequestDto } from "@/domain/campus/UpdateSpaceResourceRequestDto";
import type { Campus } from "@/domain/campus/Campus";
import type { CreateCampusRequestDto } from "@/domain/campus/CreateCampusRequestDto";
import { campusSchema } from "@/shared/validation/campusSchema";

interface CampusFormProps {
    initialData?: Campus | null;
    onSuccess?: () => void;
}

export default function CampusForm({ initialData, onSuccess }: CampusFormProps) {
    const { t } = useTranslation();

    const isEditMode = Boolean(initialData);
    const createMutation = useCreateCampus();
    const updateMutation = useUpdateCampus();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<CreateCampusRequestDto | UpdateCampusRequestDto>({
        resolver: yupResolver(campusSchema) as any,
        defaultValues: {
            name: initialData?.name ?? "",
            address: initialData?.address ?? "",
        },
    });

    const onSubmit = (data: CreateCampusRequestDto | UpdateCampusRequestDto) => {
        if (isEditMode && initialData) {
            updateMutation.mutate(
                { ...data, id: initialData.id },
                { onSuccess }
            );
        } else {
            createMutation.mutate(data as CreateCampusRequestDto, { onSuccess });
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
                label={t("admin.campuses.fields.name")}
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message ?? " "}
            />

            <TextField
                fullWidth
                label={t("admin.campuses.fields.address")}
                margin="normal"
                multiline
                rows={3}
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message ?? " "}
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
